import { Schema, Types, Document, PopulatedDoc, model } from "mongoose";
import { User } from "./user.model";

export interface News {
  title: string;
  content: string;
  author: PopulatedDoc<Types.ObjectId & User>;
  likes?: number;
  comments?: string[];
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<News>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: { type: Number, default: 0 },
    tags: { type: [String], index: true, lowercase: true },
    comments: [{ body: String, name: String, date: Date }],
  },
  { timestamps: true }
);

const NewsModel = model<News>("News", schema);

export default NewsModel;
