import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Please enter your email address").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Please enter your password")
    .min(6, "Passwords are least 6 characters long. Please enter a valid password"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
