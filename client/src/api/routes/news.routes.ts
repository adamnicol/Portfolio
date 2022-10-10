import axios from "../axios";
import {
  IComment,
  ICommentFilters,
  ICommentPayload,
  INewsFilters,
  INewsPayload,
  INewsPost,
  ITag,
} from "../interfaces";

export function getTopPosts(limit: number) {
  return axios
    .get<INewsPost[]>("/news/top", { params: { limit } })
    .then((res) => res.data);
}

export function getTopTags(limit: number) {
  return axios
    .get<ITag[]>("/news/tags", { params: { limit } })
    .then((res) => res.data);
}

export function getNews(params: INewsFilters) {
  return axios.get<INewsPayload>("/news", { params }).then((res) => res.data);
}

export function getPost(slug?: string) {
  return axios.get<INewsPost>(`/news/${slug}`).then((res) => res.data);
}

export function getNewsCount(tag?: string | null) {
  return axios
    .get<number>("/news/count", { params: { tag } })
    .then((res) => res.data);
}

export function getComments(params: ICommentFilters, post?: INewsPost) {
  return axios
    .get<ICommentPayload>(`/news/${post?.id}/comments`, { params })
    .then((res) => res.data);
}

export function getCommentCount(post?: INewsPost) {
  return axios
    .get<number>(`/news${post?.id}/comments/count`)
    .then((res) => res.data);
}

export function postComment(post: INewsPost, comment: string) {
  return axios
    .post<IComment>(`/news/${post.id}/comments`, { comment })
    .then((res) => res.data);
}

export function likePost(post: INewsPost) {
  return axios
    .post(`/news/${post.id}/like`, { params: { value: true } })
    .then((res) => res.data);
}
