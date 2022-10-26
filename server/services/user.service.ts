import bcrypt from "bcrypt";
import config from "../utils/config";
import db from "../database";
import { Prisma, Role, User } from "@prisma/client";

export async function findById(id: number): Promise<User | null> {
  return await db.user.findFirst({ where: { id } });
}

export async function findByEmail(email: string): Promise<User | null> {
  return await db.user.findFirst({ where: { email } });
}

export async function checkPassword(
  user: User,
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, user.password);
}

export async function create(user: Prisma.UserCreateInput): Promise<User> {
  const salt = await bcrypt.genSalt(config.auth.saltRounds);
  user.password = await bcrypt.hash(user.password, salt);

  if ((await db.user.count()) === 0) {
    // Make the first user an admin.
    user.role = Role.Admin;
  }

  return await db.user.create({ data: user });
}
