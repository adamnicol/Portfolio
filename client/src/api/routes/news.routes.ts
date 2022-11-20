import api from "../client";
import {
  IComment,
  ICommentFilters,
  ICommentPayload,
  INewsFilters,
  INewsPayload,
  INewsPost,
  ITag,
} from "../interfaces";

export function getNews(filters: INewsFilters) {
  return api.get<INewsPayload>("/news", { params: filters });
}

export function getPost(slug?: string) {
  return api.get<INewsPost>(`/news/${slug}`);
}

export function getTopPosts(limit: number) {
  return api.get<INewsPost[]>("/news/top", { params: { limit } });
}

export function getTopTags(limit: number) {
  return api.get<ITag[]>("/news/tags", { params: { limit } });
}

export function getNewsCount(tag?: string | null) {
  return api.get<number>("/news/count", { params: { tag } });
}

export function getComments(params: ICommentFilters, post?: INewsPost) {
  return api.get<ICommentPayload>(`/news/${post?.id}/comments`, { params });
}

export function getCommentCount(post: INewsPost) {
  return api.get<number>(`/news${post.id}/comments/count`);
}

export function postComment(post: INewsPost, comment: string) {
  return api.post<IComment>(`/news/${post.id}/comments`, { comment });
}

export function likePost(post: INewsPost) {
  return api.post<INewsPost>(`/news/${post.id}/like`);
}

export function unlikePost(post: INewsPost) {
  return api.post<INewsPost>(`/news/${post.id}/unlike`);
}