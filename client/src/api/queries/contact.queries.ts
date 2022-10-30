import * as api from "../routes/contact.routes";
import { IMessage } from "../interfaces";
import { useMutation } from "react-query";

export function useContact() {
  return useMutation((message: IMessage) => api.contact(message));
}

export function useNetlifyContact() {
  return useMutation((message: IMessage) =>
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...message }),
    })
  );
}

function encode(body: any) {
  return Object.keys(body)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(body[key]))
    .join("&");
}
