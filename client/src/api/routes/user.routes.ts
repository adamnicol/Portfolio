import axios from "../axios";
import { ICredentials, IUser } from "../interfaces";

export function login(params: ICredentials) {
  return axios.post<IUser>("/users/login", params).then((res) => res.data);
}

export function logout() {
  return axios.post("/users/logout").then((res) => res.data);
}

export function refreshLogin() {
  return axios.get<IUser>("/users/refresh").then((res) => res.data);
}
