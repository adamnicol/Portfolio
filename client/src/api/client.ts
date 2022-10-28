import axios from "axios";
import config from "../utils/config";

const instance = axios.create({
  baseURL: config.API_URL,
  withCredentials: true,
});

const api = {
  get<T>(url: string, params?: any) {
    return instance.get<T>(url, params).then((res) => res.data);
  },
  post<T>(url: string, payload?: any) {
    return instance.post<T>(url, payload).then((res) => res.data);
  },
  put<T>(url: string, payload?: any) {
    return instance.put<T>(url, payload).then((res) => res.data);
  },
  delete<T>(url: string, payload?: any) {
    return instance.delete<T>(url, payload).then((res) => res.data);
  },
};

export default api;
