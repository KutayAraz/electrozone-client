import { z } from "zod";

export const passwordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current Password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters long"),
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
