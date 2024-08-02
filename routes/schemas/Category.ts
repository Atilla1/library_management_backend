import { z } from "zod";

type FormData = z.infer<typeof schema>;

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required." }),
});

export function validate(body: FormData) {
  return schema.safeParse(body);
}
