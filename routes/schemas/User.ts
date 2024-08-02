import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .min(1, { message: "Username is required." })
    .min(3, { message: "Username is too short." }),
  username: z
    .string()
    .min(1, { message: "Username is required." })
    .min(3, { message: "Username is too short." }),
  password: z
    .string()
    .min(1, { message: "Password is required." })
    .min(8, { message: "Password is too short" }),
});

type FormData = z.infer<typeof schema>;

export function validate(body: FormData) {
  return schema.safeParse(body);
}
