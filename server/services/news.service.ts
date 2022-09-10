import { FilterQuery } from "mongoose";
import NewsModel, { News } from "../models/news.model";

export async function get(
  limit: number = 100,
  offset: number = 0,
  filter: FilterQuery<News> = {}
): Promise<News[]> {
  return await NewsModel.find(filter)
    .limit(limit)
    .skip(offset)
    .populate("author", "username")
    .sort({ createdAt: -1 });
}

export async function getTop(count: number = 10): Promise<News[]> {
  return await NewsModel.find().sort({ likes: 1 }).limit(count);
}

export async function getById(id: string): Promise<News | null> {
  return await NewsModel.findById(id).populate("author", "username");
}

export async function count(filter: FilterQuery<News> = {}): Promise<number> {
  return await NewsModel.count(filter);
}

export async function getTags(limit: number): Promise<string[]> {
  const result = await NewsModel.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    { $sort: { _id: -1 } },
    { $limit: Number(limit) },
  ]);

  return result.map((x) => x._id);
}

export async function post(newsPost: News): Promise<News> {
  return await NewsModel.create(newsPost);
}
