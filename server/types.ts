import { Post } from "@prisma/client";

export type PopulatedPost = Post & {
  author: { username: string };
  likes: { user_id: number }[];
  _count: { comments: number; likes: number };
};
