import z from "zod";

export const ContactSchema = z.object({
  name: z.string().nonempty("Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  captcha: z.string().nonempty("Please confirm you are human"),
});

export type Message = z.infer<typeof ContactSchema>;
