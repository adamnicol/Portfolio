export interface IUser {
  id: string;
  username: string;
  email: string;
  active: boolean;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface IRegistration {
  email: string;
  username: string;
  password: string;
  passwordRetype: string;
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

export interface IProject {
  name: string;
  description: string;
  image: string;
  website: string;
  github: string;
  complete: boolean;
  tags: ITag[];
}

export interface IMessage {
  name: string;
  email: string;
  message: string;
}
