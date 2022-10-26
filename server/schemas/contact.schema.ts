import z from "zod";

export const contact = z.object({
  body: z.object({
    from: z
      .string({
        required_error: "Email address is required",
      })
      .trim()
      .email("Not a valid email"),
    content: z.string({
      required_error: "Email body is required",
    }),
  }),
});

export type ContactSchema = z.infer<typeof contact>;
