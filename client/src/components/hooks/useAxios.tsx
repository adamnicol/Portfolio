import axios, { AxiosError } from "axios";
import Login from "../Login";
import Status from "../../utils/statusCodes";
import { useModal } from "../providers/ModalProvider";

const useAxios = (handleErrors: boolean = true) => {
  const modal = useModal();

  const instance = axios.create({
    baseURL: "http://localhost:3001/api",
    withCredentials: true,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (handleErrors) {
        if (error.response?.status === Status.Unauthorized) {
          modal.show(<Login />);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxios;
