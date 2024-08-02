import { z } from "zod";

const schema = z
  .object({
    id: z.string().optional(),
    categoryId: z.string().min(1, { message: "You must select a category" }),
    title: z.string().min(1, { message: "Title is required" }),
    author: z.string().min(1, { message: "Author is required" }),
    type: z.string().min(1, { message: "You must select a type" }),
    nbrPages: z
      .number({
        invalid_type_error: "Number of pages must be a number, at least 0",
      })
      .min(0, { message: "Number of pages must be at least 0" })
      .max(10000, { message: "Number of pages cannot be higher than 1000" }),
    runTimeMinutes: z
      .number({ invalid_type_error: "Minutes must be a number, at least 0" })
      .min(0, { message: "Minutes must be at least 0" })
      .max(10000, { message: "Minutes cannot be higher than 1000" }),
    isBorrowable: z.boolean().optional(),
  })
  .strict();

type FormData = z.infer<typeof schema>;

export function validate(body: FormData) {
  return schema.safeParse(body);
}
