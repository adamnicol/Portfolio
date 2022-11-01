import * as api from "../routes/user.routes";
import { ICredentials, IRegistration } from "../interfaces";
import { useMutation } from "react-query";

export function useLogin() {
  return useMutation((credentials: ICredentials) => api.login(credentials));
}

export function useRegister() {
  return useMutation((details: IRegistration) => api.register(details));
}

export function useActivate() {
  return useMutation((token: string) => api.activate(token));
}
