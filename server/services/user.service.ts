import bcrypt from "bcrypt";
import config from "../utils/config";
import db from "../database";
import { Prisma, User } from "@prisma/client";

export async function findById(id: number): Promise<User | null> {
  return await db.user.findFirst({ where: { id } });
}

export async function findByEmail(email: string): Promise<User | null> {
  return await db.user.findFirst({ where: { email } });
}

export async function create(data: Prisma.UserCreateInput): Promise<User> {
  data.password = await hashPassword(data.password);
  return await db.user.create({ data });
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(config.auth.saltRounds);
  return await bcrypt.hash(password, salt);
}

export async function checkPassword(
  user: User,
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, user.password);
}
