import Status from "@utils/statusCodes";
import { AxiosError } from "axios";
import { Login } from "../pages/account/Login";
import { MutationFunction, useMutation, UseMutationOptions } from "react-query";
import { useAuth, useModal } from "@hooks";
import { useEffect } from "react";

export function useMutationWithAuth<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown
>(
  mutationFn: MutationFunction<TData, TVariables>,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
) {
  const mutation = useMutation(mutationFn, options);
  const auth = useAuth();
  const modal = useModal();

  useEffect(() => {
    if (mutation.error instanceof AxiosError) {
      if (mutation.error.response?.status === Status.Unauthorized) {
        auth.clearCurrentUser();
        modal.show(<Login />);
      }
    }
  }, [mutation.error]);

  return mutation;
}
