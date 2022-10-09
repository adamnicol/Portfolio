import Login from "../components/Login";
import Status from "../utils/statusCodes";
import { AxiosError } from "axios";
import { MutationFunction, useMutation, UseMutationOptions } from "react-query";
import { useEffect } from "react";
import { useModal } from "../providers/ModalProvider";

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
  const modal = useModal();

  useEffect(() => {
    if (mutation.error instanceof AxiosError) {
      if (mutation.error.response?.status === Status.Unauthorized) {
        modal.show(<Login />);
      }
    }
  }, [mutation.error]);

  return mutation;
}
