import UserModel, { User } from "../models/user.model";
import bcrypt from "bcrypt";

export async function createUser(input: User): Promise<User> {
  const hash = await bcrypt.hash(input.password, 10);
  return await UserModel.create({ ...input, password: hash });
}

export async function validatePassword(
  email: string,
  password: string
): Promise<boolean> {
  const user = await UserModel.findOne({ email });
  if (user) {
    return await bcrypt.compare(password, user.password);
  } else {
    return false;
  }
}
