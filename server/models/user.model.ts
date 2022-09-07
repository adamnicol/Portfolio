import mongoose from "mongoose";

export interface User {
  username: string;
  password: string;
  email: string;
}

const schema = new mongoose.Schema<User>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

schema.method("toJSON", function () {
  let user = this.toObject();
  delete user.password;
  delete user.__v;
  return user;
});

const UserModel = mongoose.model<User>("User", schema);

export default UserModel;
