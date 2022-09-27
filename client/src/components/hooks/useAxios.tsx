import axios, { AxiosError } from "axios";
import Login from "../Login";
import Status from "../../utils/statusCodes";
import { useModal } from "../providers/ModalProvider";
import { useNavigate } from "react-router-dom";

const useAxios = (redirectOn401: boolean = false) => {
  const modal = useModal();
  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: "http://localhost:3001/api",
    withCredentials: true,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === Status.Unauthorized) {
        if (redirectOn401) {
          navigate("/login");
        } else {
          modal.show(<Login />);
        }
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxios;
