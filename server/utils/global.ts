import { AccessToken } from "../types";

declare global {
  namespace Express {
    interface Request {
      token: AccessToken;
    }
  }
}
