import mongoose from "mongoose";
import { User } from "./user.model";

export interface NewsInput {
  title: string;
  content: string;
  author: User | string;
  tags?: string[];
  likes?: User[];
  comments: number;
}

export interface News extends NewsInput {
  _id: mongoose.Schema.Types.ObjectId;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema<News>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      index: true,
      lowercase: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      slug: "title",
      unique: true,
      slug_padding_size: 1,
    },
  },
  { timestamps: true }
);

mongoose.plugin(require("mongoose-slug-generator"));

const NewsModel = mongoose.model<News>("News", schema);

export default NewsModel;
