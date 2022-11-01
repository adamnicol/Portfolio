import api from "../client";
import { ICredentials, IRegistration, IUser } from "../interfaces";

export function login(credentials: ICredentials) {
  return api.post<IUser>("/users/login", credentials);
}

export function logout() {
  return api.post("/users/logout");
}

export function refreshLogin() {
  return api.get<IUser>("/users/refresh");
}

export function register(details: IRegistration) {
  return api.post<IUser>("/users/register", details);
}
