import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().nonempty("Please enter a password"),
});

export type Credentials = z.infer<typeof LoginSchema>;
