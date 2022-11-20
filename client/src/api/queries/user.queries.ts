import * as api from "../routes/user.routes";
import { ICredentials, IRegistration, IUser } from "../interfaces";
import { useAuth } from "../../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "react-query";

export function useRegister() {
  return useMutation((details: IRegistration) => api.register(details));
}

export function useLogin() {
  const queryClient = useQueryClient();
  const auth = useAuth();

  return useMutation((credentials: ICredentials) => api.login(credentials), {
    onSuccess: (user: IUser) => {
      auth.setCurrentUser(user);
      queryClient.invalidateQueries("news");
      queryClient.invalidateQueries("post");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const auth = useAuth();

  return useMutation(() => api.logout(), {
    onSuccess: () => {
      auth.clearCurrentUser();
      queryClient.invalidateQueries("news");
      queryClient.invalidateQueries("post");
    },
  });
}

export function useGetUserProfile(username?: string) {
  return useQuery(["user", username], () => {
    if (username) {
      return api.getUserProfile(username);
    }
  });
}
