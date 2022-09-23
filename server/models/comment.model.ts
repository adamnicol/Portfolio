import mongoose, { ObjectId } from "mongoose";
import { User } from "./user.model";

export interface IComment {
  author: User;
  post_id: ObjectId;
  content: string;
}

const schema = new mongoose.Schema<IComment>(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post_id: {
      type: mongoose.Types.ObjectId,
      ref: "News",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model<IComment>("Comments", schema);

export default CommentModel;
