import UserModel, { User } from "../models/user.model";
import bcrypt from "bcrypt";
import config from "../utils/config";

export async function createUser(input: User): Promise<User> {
  const salt = await bcrypt.genSalt(config.auth.saltRounds);
  const hash = await bcrypt.hash(input.password, salt);
  return await UserModel.create({
    ...input,
    password: hash,
  });
}

export async function findUser(email: string): Promise<User | null> {
  const user = await UserModel.findOne({ email }).select("+password");
  return user;
}

export async function checkPassword(
  user: User,
  password: string
): Promise<boolean> {
  const match = await bcrypt.compare(password, user.password);
  return match;
}
