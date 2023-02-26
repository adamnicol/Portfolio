export interface IUser {
  id: string;
  username: string;
  email: string;
  active: boolean;
}

export interface IUserProfile {
  username: string;
  active: boolean;
  createdAt: Date;
  lastLogin?: Date;
  role: string;
  posts: number;
  comments: number;
  likes: number;
}

export interface INewsPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  likes: number;
  liked: boolean;
  comments: number;
  tags?: ITag[];
  createdAt: Date;
  updatedAt: Date;
  image: string;
}

export interface INewsPayload {
  posts: INewsPost[];
  total: number;
  returned: number;
}

export interface INewsFilters {
  tag?: string | null;
  limit: number;
  offset: number;
}

export interface ITag {
  id: number;
  name: string;
}

export interface IComment {
  user: IUser;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommentPayload {
  comments: IComment[];
  total: number;
  returned: number;
}

export interface ICommentFilters {
  limit: number;
  offset: number;
}

export interface IProject {
  name: string;
  description: string;
  image: string;
  website: string;
  github: string;
  complete: boolean;
  tags: ITag[];
}
