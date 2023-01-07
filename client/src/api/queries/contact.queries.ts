import * as api from "../routes/contact.routes";
import { Message } from "../../schemas/contact.schema";
import { useMutation } from "react-query";

export function useContact() {
  return useMutation((message: Message) => api.contact(message));
}

export function useNetlifyContact() {
  return useMutation((params: { message: Message; botfield: string }) =>
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        "bot-field": params.botfield,
        "g-recaptcha-response": params.message.captcha,
        ...params.message,
        captcha: undefined,
      }),
    })
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function encode(message: any) {
  return Object.keys(message)
    .map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(message[key])
    )
    .join("&");
}
