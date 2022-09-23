export interface IUser {
  _id: string;
  username: string;
  password: string;
  email: string;
}

export interface INewsPost {
  _id: string;
  title: string;
  content: string;
  author: IUser;
  likes?: number;
  tags?: string[];
  comments: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IComment {
  author: IUser;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
