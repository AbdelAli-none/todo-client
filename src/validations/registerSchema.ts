import z from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(3, "First name must be at least 3 characters."),
    lastName: z.string().min(3, "Last name must be at least 3 characters."),
    email: z.email().min(1, { message: "Email is required!" }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/.*[!@#$%^&*()_+{}|\]\\:";'<>?,/].*/, {
        message: "Password must contains at least one special character!",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required!" }),
  })
  .refine((input) => input.password === input.confirmPassword, {
    error: "Password and confirm password are not matched!",
    path: ["confirmPassword"],
  });
