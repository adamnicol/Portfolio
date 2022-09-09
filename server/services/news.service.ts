import NewsModel, { News } from "../models/news.model";

export async function getAll(
  limit: number = 100,
  offset: number = 0
): Promise<News[]> {
  return await NewsModel.find()
    .limit(limit)
    .skip(offset)
    .populate("author", "username")
    .sort({ createdAt: -1 });
}

export async function getTop(count: number = 100): Promise<News[]> {
  return await NewsModel.find().sort({ likes: 1 }).limit(count);
}

export async function getByTag(
  limit: number = 100,
  offset: number = 0,
  tag: string
): Promise<News[]> {
  return await NewsModel.find({ tags: tag.toLowerCase() })
    .limit(limit)
    .skip(offset)
    .populate("author", "username")
    .sort({ createdAt: -1 });
}

export async function getNewById(id: string): Promise<News | null> {
  return await NewsModel.findById(id).populate("author", "username");
}

export async function getCount(): Promise<number> {
  return await NewsModel.count();
}

export async function getCountByTag(tag: string): Promise<number> {
  return await NewsModel.count({ tags: tag.toLowerCase() });
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

export async function postNews(newsPost: News): Promise<News> {
  return await NewsModel.create(newsPost);
}
