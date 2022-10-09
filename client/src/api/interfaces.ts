export interface IUser {
  id: string;
  username: string;
  password: string;
  email: string;
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