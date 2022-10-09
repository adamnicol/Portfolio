import * as routes from "../routes/news.routes";
import { ICommentFilters, INewsFilters, INewsPost } from "../interfaces";
import { useMutationWithAuth } from "../../hooks/useMutationWithAuth";
import { useQuery, useQueryClient } from "react-query";

export function useGetTopPosts(limit: number) {
  return useQuery("top-posts", () => routes.getTopPosts(limit));
}

export function useGetTopTags(limit: number) {
  return useQuery("tags", () => routes.getTopTags(limit));
}

export function useGetNews(filters: INewsFilters) {
  const queryClient = useQueryClient();

  return useQuery(["news", filters], () => routes.getNews(filters), {
    onSuccess: (news) => {
      news.posts.forEach((post) => {
        queryClient.setQueryData(["post", post.slug], post);
      });

      const newFilters = {
        ...filters,
        offset: filters.offset + filters.limit,
      };

      if (newFilters.offset < news.total) {
        // Preload the next page.
        queryClient.prefetchQuery(["news", newFilters], () =>
          routes.getNews(newFilters)
        );
      }
    },
  });
}

export function useGetPost(slug?: string) {
  return useQuery(["post", slug], () => routes.getPost(slug), {
    enabled: Boolean(slug),
  });
}

export function useGetComments(filters: ICommentFilters, post?: INewsPost) {
  const queryClient = useQueryClient();

  return useQuery(
    ["comments", post?.id, filters],
    () => routes.getComments(filters, post),
    {
      onSuccess: (comments) => {
        const newFilters = {
          ...filters,
          offset: filters.offset + filters.limit,
        };

        if (newFilters.offset < comments.total) {
          // Preload the next page.
          queryClient.prefetchQuery(["comments", post?.id, newFilters], () =>
            routes.getComments(newFilters, post)
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
      routes.postComment(params.post, params.comment),
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

  return useMutationWithAuth(() => routes.likePost(post), {
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
