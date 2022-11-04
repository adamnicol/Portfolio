import config from "./config";
import jwt from "jsonwebtoken";

export function signToken(payLoad: any, expires: string | number) {
  return jwt.sign(payLoad, config.auth.privateKey, {
    algorithm: "RS256",
    expiresIn: expires,
    issuer: config.auth.issuer,
  });
}

export function verifyToken<T>(token: string): {
  valid: boolean;
  expired: boolean;
  payLoad: T | null;
} {
  try {
    const payLoad = jwt.verify(token, config.auth.publicKey, {
      issuer: config.auth.issuer,
    }) as T;

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
