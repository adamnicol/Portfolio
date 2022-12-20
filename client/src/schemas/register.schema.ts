import z from "zod";

export const RegisterSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    username: z
      .string()
      .trim()
      .min(2, "Username must be at least 2 characters")
      .max(25, "Username must be less than 25 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    passwordRetype: z.string().min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.passwordRetype, {
    message: "Passwords do not match",
    path: ["passwordRetype"],
  });

export type Registration = z.infer<typeof RegisterSchema>;
