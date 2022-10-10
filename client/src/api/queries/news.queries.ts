import * as api from "../routes/news.routes";
import { ICommentFilters, INewsFilters, INewsPost } from "../interfaces";
import { useMutationWithAuth } from "../../hooks/useMutationWithAuth";
import { useQuery, useQueryClient } from "react-query";

export function useGetTopPosts(limit: number) {
  return useQuery("top-posts", () => api.getTopPosts(limit));
}

export function useGetTopTags(limit: number) {
  return useQuery("tags", () => api.getTopTags(limit));
}

export function useGetNews(filters: INewsFilters) {
  const queryClient = useQueryClient();

  return useQuery(["news", filters], () => api.getNews(filters), {
    onSuccess: (news) => {
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

  return useQuery(
    ["comments", post?.id, filters],
    () => api.getComments(filters, post),
    {
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
    }
  );
}

export function usePostComment(post?: INewsPost) {
  const queryClient = useQueryClient();

  return useMutationWithAuth(
    (params: { post: INewsPost; comment: string }) =>
      api.postComment(params.post, params.comment),
    {
      onSuccess: () => {
        if (post) {
          queryClient.setQueryData(["post", post.slug], {
            ...post,
            comments: post.comments + 1,
          });
        }
      },
    }
  );
}

export function useLikePost(post: INewsPost) {
  const queryClient = useQueryClient();

  return useMutationWithAuth(() => api.likePost(post), {
    onSuccess: () => {
      queryClient.invalidateQueries("news");
      queryClient.invalidateQueries("top-posts");
      queryClient.setQueryData(["post", post.slug], {
        ...post,
        liked: true,
        likes: post.likes + 1,
      });
    },
  });
}
