import api from "../client";
import { Message } from "../../schemas/contact.schema";

export function contact(message: Message) {
  return api.post<Message>("/contact", message);
}
