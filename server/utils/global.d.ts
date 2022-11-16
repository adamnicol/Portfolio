import { AccessToken } from "../types";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Express {
    interface Request {
      token: AccessToken;
    }
  }
}
