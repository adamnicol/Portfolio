import mongoose from "mongoose";
import { User } from "./user.model";

export interface NewsInput {
  title: string;
  content: string;
  author: mongoose.Types.ObjectId | User;
  likes?: number;
  comments?: string[];
  tags?: string[];
}

export interface News extends NewsInput {
  _id: mongoose.Schema.Types.ObjectId;
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
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      index: true,
      lowercase: true,
    },
    comments: [
      {
        name: String,
        comment: String,
        date: Date,
      },
    ],
  },
  { timestamps: true }
);

const NewsModel = mongoose.model<News>("News", schema);

export default NewsModel;
