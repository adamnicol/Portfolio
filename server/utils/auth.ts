import jwt from "jsonwebtoken";
import config from "../utils/config";
import { User, Role } from "../models/user.model";

export interface TokenPayload {
  userId: string;
  role: Role;
  expires: number;
}

export function signToken(user: User): string {
  const privateKey = config.auth.privateKey;
  const payLoad = {
    userId: user._id,
    role: user.role,
    expires: config.auth.tokenExpires,
  };
  return jwt.sign(payLoad, privateKey, { algorithm: "RS256" });
}

export function verifyToken(token: string): {
  valid: boolean;
  expired: boolean;
  payLoad: TokenPayload | null;
} {
  try {
    const publicKey = config.auth.publicKey;
    const payLoad = jwt.verify(token, publicKey) as TokenPayload;
    return { valid: true, expired: false, payLoad };
  } catch (e: any) {
    const error = e as Error;
    return {
      valid: false,
      expired: error.message === "jwt expired",
      payLoad: null,
    };
  }
}
