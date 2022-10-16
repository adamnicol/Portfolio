import axios from "axios";
import config from "../utils/config";

const instance = axios.create({
  baseURL: config.API_URL,
  withCredentials: true,
});

export default instance;
