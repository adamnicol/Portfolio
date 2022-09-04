import mongoose from "mongoose";

export interface User {
  username: string;
  password: string;
  email: string;
}

const schema = new mongoose.Schema<User>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 8 },
    email: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const UserModel = mongoose.model<User>("User", schema);

export default UserModel;
