import { Post, Role } from "@prisma/client";

export * from "@prisma/client";

export interface PopulatedPost extends Post {
  author: { username: string };
  likes: { user_id: number }[];
  _count: { comments: number; likes: number };
}

export interface AccessToken {
  userId: number;
  role: Role;
}

export interface RefreshToken {
  userId: number;
}

export interface ActivationToken {
  email: string;
}
