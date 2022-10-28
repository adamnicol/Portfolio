import * as api from "../routes/contact.routes";
import { IMessage } from "../interfaces";
import { useMutation } from "react-query";

export function useContact() {
  return useMutation((message: IMessage) => api.contact(message));
}
