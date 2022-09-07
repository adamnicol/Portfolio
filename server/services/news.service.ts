import NewsModel, { News } from "../models/news.model";

export async function getNews(
  limit: number = 100,
  offset: number = 0
): Promise<News[]> {
  return await NewsModel.find()
    .limit(limit)
    .skip(offset)
    .populate("author", "username")
    .sort({ createdAt: -1 });
}

export async function getCount(): Promise<number> {
  return await NewsModel.count();
}

export async function postNews(newsPost: News): Promise<News> {
  return await NewsModel.create(newsPost);
}
