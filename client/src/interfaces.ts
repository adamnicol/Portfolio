export interface IUser {
  _id: string;
  username: string;
  password: string;
  email: string;
}

export interface INews {
  _id: string;
  title: string;
  content: string;
  author: IUser;
  likes?: number;
  comments?: string[];
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}
