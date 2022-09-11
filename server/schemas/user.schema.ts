import z from "zod";

export const createUserSchema = z.object({
  body: z.object({
    username: z
      .string({
        required_error: "Username is required",
      })
      .trim()
      .min(2, "Username must be at least 2 characters")
      .max(25, "Username must be less than 25 characters"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters"),
    email: z
      .string({
        required_error: "Email is required",
      })
      .trim()
      .email("Not a valid email"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: "Email is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});

export type UserSchema = z.infer<typeof createUserSchema>["body"];
export type UserLoginSchema = z.infer<typeof loginSchema>["body"];
