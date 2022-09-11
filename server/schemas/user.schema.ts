import { object, string } from "zod";

export const createUserSchema = object({
  body: object({
    username: string({
      required_error: "Username is required",
    })
      .trim()
      .min(2, "Username must be at least 2 characters")
      .max(25, "Username must be less than 25 characters"),
    password: string({
      required_error: "Password is required",
    }).min(8, "Password must be at least 8 characters"),
    email: string({
      required_error: "Email is required",
    })
      .trim()
      .email("Not a valid email"),
  }),
});

export const loginSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }),
    password: string({
      required_error: "Password is required",
    }),
  }),
});
