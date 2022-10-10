import * as api from "../routes/user.routes";
import { ICredentials } from "../interfaces";
import { useMutation } from "react-query";

export function useLogin() {
  return useMutation((credentials: ICredentials) => api.login(credentials));
}
