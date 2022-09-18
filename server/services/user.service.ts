import UserModel, { User, UserInput } from "../models/user.model";
import config from "../utils/config";
import bcrypt from "bcrypt";

export async function createUser(input: UserInput): Promise<User> {
  const salt = await bcrypt.genSalt(config.auth.saltRounds);
  const hash = await bcrypt.hash(input.password, salt);

  return await UserModel.create({ ...input, password: hash });
}

export async function findUserById(id: string): Promise<User | null> {
  return await UserModel.findById(id);
}

export async function findUserByEmail(email: string): Promise<User | null> {
  return await UserModel.findOne({ email }).select("+password");
}

export async function checkPassword(user: User, password: string) {
  return await bcrypt.compare(password, user.password);
}
