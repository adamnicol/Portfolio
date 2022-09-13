import mongoose from "mongoose";

export enum Role {
  User,
  Moderator,
  Admin,
}

export interface UserInput {
  username: string;
  email: string;
  password: string;
}

export interface User extends UserInput {
  _id: mongoose.Schema.Types.ObjectId;
  role: Role;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: Number,
      required: true,
      enum: Role,
      default: Role.User,
    },
    active: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  { timestamps: true }
);

// Removes the password from any JSON responses.
schema.method("toJSON", function () {
  let user: any = this.toObject();
  delete user.password;
  return user;
});

const UserModel = mongoose.model<User>("User", schema);

export default UserModel;
