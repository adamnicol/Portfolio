import * as api from "../routes/contact.routes";
import { IMessage } from "../interfaces";
import { useMutation } from "react-query";

export function useContact() {
  return useMutation((message: IMessage) => api.contact(message));
}

export function useNetlifyContact() {
  return useMutation((params: { message: IMessage; botfield: string }) =>
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        "bot-field": params.botfield,
        ...params.message,
      }),
    })
  );
}

function encode(message: any) {
  return Object.keys(message)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(message[key])
    )
    .join("&");
}
