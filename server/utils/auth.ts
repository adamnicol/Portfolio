import jwt from "jsonwebtoken";
import config from "./config";
import { Role, User } from "../models/user.model";

export interface TokenPayload {
  userId: string;
  role: Role;
}

export function createToken(user: User, expires: string | number) {
  const payLoad = {
    userId: user._id.toString(),
    role: user.role,
  };
  return signToken(payLoad, expires);
}

export function signToken(payLoad: TokenPayload, expires: string | number) {
  return jwt.sign(payLoad, config.auth.privateKey, {
    algorithm: "RS256",
    expiresIn: expires,
  });
}

export function verifyToken(token: string): {
  valid: boolean;
  expired: boolean;
  payLoad: TokenPayload | null;
} {
  try {
    const payLoad = jwt.verify(token, config.auth.publicKey) as TokenPayload;
    return { valid: true, expired: false, payLoad };
  } catch (e: any) {
    const error = e as Error;
    return {
      valid: false,
      expired: error.message.includes("jwt expired"),
      payLoad: null,
    };
  }
}
