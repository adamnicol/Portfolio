import z from "zod";

export const postNews = z.object({
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

export const postComment = z.object({
  params: z.object({
    id: z.string({
      required_error: "Post Id is required",
    }),
  }),
  body: z.object({
    comment: z
      .string({
        required_error: "Comment is required",
      })
      .trim()
      .min(5, "Comment must be at least 5 characters")
      .max(500, "Comment must not exceed 500 characters"),
  }),
});

export const getNews = z.object({
  query: z.object({
    limit: z.number().or(z.string().transform(Number)).optional(),
    offset: z.number().or(z.string().transform(Number)).optional(),
    tag: z.string().optional(),
  }),
});

export const getComments = z.object({
  params: z.object({
    id: z.string({
      required_error: "Post Id is required",
    }),
  }),
  query: z.object({
    limit: z.number().or(z.string().transform(Number)).optional(),
    offset: z.number().or(z.string().transform(Number)).optional(),
  }),
});

export type PostNewsSchema = z.infer<typeof postNews>;
export type PostCommentSchema = z.infer<typeof postComment>;
export type GetNewsSchema = z.infer<typeof getNews>;
export type GetCommentsSchema = z.infer<typeof getComments>;
