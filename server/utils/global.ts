import { TokenPayload } from "./auth";

declare global {
  namespace Express {
    interface Request {
      token: TokenPayload;
    }
  }
}
