export interface User {
  username: string;
  password: string;
  email: string;
}

export interface News {
  _id: string;
  title: string;
  content: string;
  author: User;
  likes?: number;
  comments?: string[];
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}
