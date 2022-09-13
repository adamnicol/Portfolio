import jwt, { SignOptions } from "jsonwebtoken";
import { User, Role } from "../models/user.model";
import config from "../utils/config";

export interface TokenPayload {
  userId: string;
  role: Role;
}

export function createAccessToken(user: User): string {
  const privateKey = config.auth.privateKey;
  const payLoad = {
    userId: user._id,
    role: user.role,
  };
  const options: SignOptions = {
    algorithm: "RS256",
    expiresIn: "15m",
  };

  return jwt.sign(payLoad, privateKey, options);
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
      expired: error.message.includes("jwt expired"),
      payLoad: null,
    };
  }
}
