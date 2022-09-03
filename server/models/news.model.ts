import mongoose from "mongoose";

export interface News {
  title: string;
  body: string;
  author: mongoose.Types.ObjectId;
  likes?: number;
  comments?: string[];
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema<News>(
  {
    title: { type: String, required: true, maxlength: 50, trim: true },
    body: { type: String, required: true, trim: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: { type: Number, default: 0 },
    tags: { type: [String], index: true },
    comments: [{ body: String, name: String, date: Date }],
  },
  { timestamps: true }
);

const NewsModel = mongoose.model<News>("News", schema);

export default NewsModel;
