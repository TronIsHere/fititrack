import * as z from "zod";

export const LoginValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
export const ForgotPasswordValidator = z.object({
  email: z.string().email(),
});
export const ChangePasswordValidator = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});
export const RegisterValidator = z
  .object({
    email: z.string().email(),
    dob: z.string().refine((data) => new Date(data) <= new Date(), {
      message: "Date of birth cannot be in the future",
    }),
    name: z
      .string()
      .min(4, { message: "Your Name and Last name is too short" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"], // This makes sure the error is assigned to `confirmPassword`
  });
export const SettingsGeneralValidator = z.object({
  name: z.string().min(4, { message: "Your Name and Last name is too short" }),
  birth: z.date(),
});
export type TLoginValidator = z.infer<typeof LoginValidator>;
export type TForgotPasswordValidator = z.infer<typeof ForgotPasswordValidator>;
export type TChangePasswordValidator = z.infer<typeof ChangePasswordValidator>;
export type TSettingsGeneralValidator = z.infer<
  typeof SettingsGeneralValidator
>;
export type TRegisterValidator = z.infer<typeof RegisterValidator>;
