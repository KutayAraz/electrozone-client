import { z } from "zod";

export const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current Password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .refine((password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasNonalphas = /\W/.test(password);
        return hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas;
      }, "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"),
    newPasswordRetyped: z.string(),
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: "New password can't be the same as the current password",
    path: ["newPassword"],
  })
  .refine((data) => data.newPasswordRetyped === data.newPassword, {
    message: "Passwords must match",
    path: ["newPasswordRetyped"],
  });

export type PasswordSchema = z.infer<typeof passwordSchema>;
