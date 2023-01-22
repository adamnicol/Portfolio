import * as api from "../routes/news.routes";
import { useMutationWithAuth } from "../../hooks";
import { useQuery, useQueryClient } from "react-query";
import {
  ICommentFilters,
  ICommentPayload,
  INewsFilters,
  INewsPost,
} from "../interfaces";

export function useGetTopPosts(limit: number) {
  return useQuery("top-posts", () => api.getTopPosts(limit));
}

export function useGetTopTags(limit: number) {
  return useQuery("tags", () => api.getTopTags(limit));
}

export function useGetNews(filters: INewsFilters) {
  const queryClient = useQueryClient();
  const queryKey = ["news", filters];

  return useQuery(queryKey, () => api.getNews(filters), {
    onSuccess: (news) => {
      // Add individual posts to the cache.
      news.posts.forEach((post) => {
        queryClient.setQueryData(["post", post.slug], post);
      });

      const newFilters = {
        ...filters,
        offset: filters.offset + filters.limit,
      };

      if (newFilters.offset < news.total) {
        // Prefetch the next page.
        queryClient.prefetchQuery(["news", newFilters], () =>
          api.getNews(newFilters)
        );
      }
    },
  });
}

export function useGetPost(slug?: string) {
  return useQuery(["post", slug], () => api.getPost(slug), {
    enabled: Boolean(slug),
  });
}

export function useGetComments(filters: ICommentFilters, post?: INewsPost) {
  const queryClient = useQueryClient();
  const queryKey = ["comments", post?.id, filters];

  return useQuery(queryKey, () => api.getComments(filters, post), {
    onSuccess: (comments) => {
      const newFilters = {
        ...filters,
        offset: filters.offset + filters.limit,
      };

      if (newFilters.offset < comments.total) {
        // Prefetch the next page.
        queryClient.prefetchQuery(["comments", post?.id, newFilters], () =>
          api.getComments(newFilters, post)
        );
      }
    },
    enabled: Boolean(post),
  });
}

export function usePostComment(filters: ICommentFilters, post: INewsPost) {
  const queryClient = useQueryClient();

  return useMutationWithAuth(
    (params: { post: INewsPost; comment: string }) =>
      api.postComment(params.post, params.comment),
    {
      onSuccess: (comment) => {
        if (post) {
          // Increment the like counter.
          queryClient.setQueryData(["post", post.slug], {
            ...post,
            comments: post.comments + 1,
          });
        }

        const key = ["comments", post.id, filters];
        const payLoad = queryClient.getQueryData<ICommentPayload>(key);

        if (payLoad) {
          // Add to the top of the current page.
          payLoad.comments.unshift(comment);
          queryClient.setQueryData(key, payLoad);
        }
      },
    }
  );
}

export function useLikePost(post: INewsPost) {
  const queryClient = useQueryClient();

  return useMutationWithAuth(
    (like: boolean) => (like ? api.likePost(post) : api.unlikePost(post)),
    {
      onSuccess: (post: INewsPost) => {
        queryClient.invalidateQueries("news");
        queryClient.invalidateQueries("top-posts");
        queryClient.setQueryData(["post", post.slug], post);
      },
    }
  );
}
