import z from "zod";

export const contact = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z
      .string({
        required_error: "Email address is required",
      })
      .trim()
      .email("Invalid email address"),
    content: z.string({
      required_error: "Email body is required",
    }),
  }),
});

export type ContactSchema = z.infer<typeof contact>;
