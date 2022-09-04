export interface User {
  username: string;
  password: string;
  email: string;
}

export interface News {
  title: string;
  content: string;
  author: string;
  likes?: number;
  comments?: string[];
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}
