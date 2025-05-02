import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().or(z.literal("")),
  email: z.string().email("Invalid email address").or(z.literal("")),
  message: z.string().min(4, "The message should be at least 4 characters long."),
  access_key: z.string(),
});

export type ContactSchema = z.infer<typeof contactSchema>;
