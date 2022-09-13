import z from "zod";

export const schema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .trim()
      .min(5, "Title must be at least 5 characters")
      .max(50, "Title must be less than 50 characters"),
    content: z.string({
      required_error: "Content is required",
    }),
    tags: z.string().array().optional(),
  }),
});

export type NewsSchema = z.infer<typeof schema>;
