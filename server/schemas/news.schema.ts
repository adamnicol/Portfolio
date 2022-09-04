import { object, string } from "zod";

const schema = object({
  body: object({
    title: string({
      required_error: "Title is required",
    })
      .trim()
      .min(5, "Title must be at least 5 characters")
      .max(50, "Title must be less than 50 characters"),
    content: string({
      required_error: "Content is required",
    }),
    author: string({
      required_error: "Author is required",
    }),
  }),
});

export default schema;
