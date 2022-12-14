import * as api from "../routes/user.routes";
import { Credentials, Registration } from "../../schemas";
import { IUser } from "../interfaces";
import { useAuth } from "../../hooks";
import { useMutation, useQuery, useQueryClient } from "react-query";

export function useRegister(successCallback?: (user: IUser) => void) {
  return useMutation((details: Registration) => api.register(details), {
    onSuccess: successCallback,
  });
}

export function useLogin(successCallback?: (user: IUser) => void) {
  const queryClient = useQueryClient();
  const auth = useAuth();

  return useMutation((credentials: Credentials) => api.login(credentials), {
    onSuccess: (user: IUser) => {
      auth.setCurrentUser(user);
      queryClient.invalidateQueries("news");
      queryClient.invalidateQueries("post");

      if (successCallback) {
        successCallback(user);
      }
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
