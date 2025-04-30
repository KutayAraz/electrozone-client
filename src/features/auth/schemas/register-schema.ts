import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password is too long")
      .refine((password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasNonalphas = /\W/.test(password);
        return hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas;
      }, "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"),
    retypedPassword: z.string().min(1, "Please confirm your password"),
    firstName: z.string().min(1, "First name is required").max(50, "First name is too long"),
    lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long"),
    address: z.string().min(1, "Address is required").max(100, "Address is too long"),
    city: z.string().min(1, "City is required").max(50, "City is too long"),
  })
  .refine((data) => data.password === data.retypedPassword, {
    message: "Passwords don't match",
    path: ["retypedPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
