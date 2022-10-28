import api from "../client";
import { IMessage } from "../interfaces";

export function contact(message: IMessage) {
  return api.post<IMessage>("/contact", message);
}
