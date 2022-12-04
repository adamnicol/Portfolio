import bcrypt from "bcrypt";
import config from "../utils/config";
import db from "../database";
import { AccessToken, ActivationToken, RefreshToken } from "../types";
import { Prisma, Role, User } from "@prisma/client";
import { signToken } from "../utils/auth";

export function findById(id: number): Promise<User | null> {
  return db.user.findFirst({ where: { id } });
}

export function findByEmail(email: string): Promise<User | null> {
  return db.user.findFirst({ where: { email } });
}

export async function create(user: Prisma.UserCreateInput): Promise<User> {
  if ((await db.user.count()) === 0) {
    // Make the first user an admin.
    user.role = Role.Admin;
  }

  user.password = await hashPassword(user.password);
  return db.user.create({ data: user });
}

export async function activateAccount(user: User) {
  return db.user.update({ where: { id: user.id }, data: { active: true } });
}

export async function setLoggedIn(user: User) {
  return db.user.update({
    where: { id: user.id },
    data: { lastLogin: new Date() },
  });
}

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(config.auth.saltRounds);
  return bcrypt.hash(password, salt);
}

export function checkPassword(user: User, password: string): Promise<boolean> {
  return bcrypt.compare(password, user.password);
}

export function createAccessToken(user: User) {
  const token: AccessToken = { userId: user.id, role: user.role };
  return signToken(token, config.auth.accessTokenTTL);
}

export function createRefreshToken(user: User) {
  const token: RefreshToken = { userId: user.id };
  return signToken(token, config.auth.refreshTokenTTL);
}

export function createActivationToken(user: User) {
  const token: ActivationToken = { email: user.email };
  return signToken(token, config.auth.activationTokenTTL);
}

export async function getUserProfile(username: string) {
  return db.user.findFirst({
    where: { username },
    select: {
      username: true,
      role: true,
      active: true,
      createdAt: true,
      lastLogin: true,
      _count: { select: { posts: true, comments: true, likes: true } },
    },
  });
}
