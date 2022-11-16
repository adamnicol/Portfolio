import db from "../database";
import slugify from "slugify";
import { Comment, Post, Prisma } from "@prisma/client";
import { PopulatedPost } from "../types";

export async function getAll(
  limit: number,
  offset: number,
  userId: number | undefined
): Promise<PopulatedPost[]> {
  return await db.post.findMany({
    skip: Number(offset),
    take: Number(limit),
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { username: true } },
      likes: { select: { user_id: true }, where: { user_id: userId ?? -1 } },
      _count: { select: { comments: true, likes: true } },
    },
  });
}

export async function getByMostLikes(limit: number): Promise<Post[]> {
  return await db.post.findMany({
    take: Number(limit),
    orderBy: { likes: { _count: "desc" } },
  });
}

export async function getByTag(
  tag: string,
  limit: number,
  offset: number,
  userId: number | undefined
) {
  return await db.post.findMany({
    skip: Number(offset),
    take: Number(limit),
    where: { tags: { some: { name: tag } } },
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { username: true } },
      likes: { select: { user_id: true }, where: { user_id: userId ?? -1 } },
      _count: { select: { comments: true, likes: true } },
    },
  });
}

export async function getTags(limit: number) {
  return await db.tag.findMany({
    orderBy: { posts: { _count: "desc" } },
    take: Number(limit),
  });
}

export async function find(
  search: Prisma.PostWhereInput,
  userId: number | undefined
): Promise<PopulatedPost | null> {
  return await db.post.findFirst({
    where: { ...search },
    include: {
      author: { select: { username: true } },
      likes: { select: { user_id: true }, where: { user_id: userId ?? -1 } },
      _count: { select: { comments: true, likes: true } },
    },
  });
}

export async function count(search?: Prisma.PostWhereInput): Promise<number> {
  return await db.post.count({ where: { ...search } });
}

export async function countByTag(tag: string): Promise<number> {
  return await db.post.count({
    where: { tags: { some: { name: tag } } },
  });
}

export async function create(
  post: Prisma.PostCreateWithoutAuthorInput,
  authorId: number,
  tags: string[]
): Promise<Post> {
  return await db.post.create({
    data: {
      ...post,
      author_id: authorId,
      tags: {
        connectOrCreate: tags.map((tag: string) => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
  });
}

export async function generateSlug(input: string): Promise<string> {
  const options = { lower: true, strict: true };
  let slug = slugify(input, options);

  for (let i = 1; ; i++) {
    if ((await db.post.count({ where: { slug } })) === 0) {
      return slug;
    }

    slug = `${slugify(input, options)}-${i}`;
  }
}

export async function getCommentCount(
  search?: Prisma.CommentWhereInput
): Promise<number> {
  return await db.comment.count({ where: { ...search } });
}

export async function getComments(
  post_id: number,
  limit: number,
  offset: number
): Promise<Comment[]> {
  return await db.comment.findMany({
    skip: Number(offset),
    take: Number(limit),
    where: { post_id },
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, username: true } },
    },
  });
}

export async function createComment(
  content: string,
  post_id: number,
  user_id: number
): Promise<Comment> {
  return await db.comment.create({
    data: {
      content,
      user: { connect: { id: user_id } },
      post: { connect: { id: post_id } },
    },
    include: { user: { select: { id: true, username: true } } },
  });
}

export async function likePost(userId: number, postId: number) {
  return await db.postLikes.create({
    data: {
      user_id: userId,
      post_id: postId,
    },
  });
}
