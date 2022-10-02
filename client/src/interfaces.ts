export interface IUser {
  id: string;
  username: string;
  password: string;
  email: string;
}

export interface INewsPost {
  id: string;
  title: string;
  content: string;
  author: IUser;
  likes: number;
  tags?: ITag[];
  comments: number;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
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
