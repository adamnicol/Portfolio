import Login from "../components/Login";
import Status from "../utils/statusCodes";
import { AxiosError } from "axios";
import { MutationFunction, useMutation, UseMutationOptions } from "react-query";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useModal } from "../context/ModalContext";

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
        auth.invalidate();
        modal.show(<Login />);
      }
    }
  }, [mutation.error]);

  return mutation;
}
