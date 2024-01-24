import * as z from "zod";

export const LoginValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
export const RegisterValidator = z.object({
  email: z.string().email(),
  name: z.string().min(4, { message: "Your Name and Last name is too short" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
export type TLoginValidator = z.infer<typeof LoginValidator>;
export type TRegisterValidator = z.infer<typeof RegisterValidator>;
