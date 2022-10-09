import * as routes from "../routes/news.routes";
import { INewsPost } from "../interfaces";
import { useMutationWithAuth } from "../../hooks/useMutationWithAuth";
import { useQuery, useQueryClient } from "react-query";

export function useGetTopPosts(limit: number) {
  return useQuery("top-posts", () => routes.getTopPosts(limit));
}

export function useGetTopTags(limit: number) {
  return useQuery("tags", () => routes.getTopTags(limit));
}

export function useGetNews(limit: number, offset: number, tag?: string | null) {
  const queryClient = useQueryClient();

  return useQuery(
    ["news", tag, limit, offset],
    () => routes.getNews(limit, offset, tag),
    {
      onSuccess: (news) => {
        news.posts.forEach((post) => {
          queryClient.setQueryData(["post", post.slug], post);
        });
      },
    }
  );
}

export function useGetNewsCount(tag?: string | null) {
  return useQuery(["news-count", tag], () => routes.getNewsCount(tag));
}

export function useGetPost(slug?: string) {
  return useQuery(["post", slug], () => routes.getPost(slug), {
    enabled: Boolean(slug),
  });
}

export function useGetComments(
  limit: number,
  offset: number,
  post?: INewsPost
) {
  return useQuery(
    ["comments", post?.id, limit, offset],
    () => routes.getComments(limit, offset, post),
    { enabled: Boolean(post) }
  );
}

export function useGetCommentCount(post?: INewsPost) {
  return useQuery(
    ["comment-count", post?.id],
    () => routes.getCommentCount(post),
    { enabled: Boolean(post) }
  );
}

export function usePostComment(slug?: string) {
  const queryClient = useQueryClient();

  return useMutationWithAuth(
    (params: { post: INewsPost; comment: string }) =>
      routes.postComment(params.post, params.comment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["post", slug]);
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
