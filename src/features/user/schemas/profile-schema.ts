import { z } from "zod";

export const profileSchema = z.object({
  email: z.string().email("Invalid email address").or(z.literal("")),
  address: z.string().min(3, "Please enter a valid address").or(z.literal("")),
  city: z.string().min(2, "Please enter a valid city").or(z.literal("")),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
