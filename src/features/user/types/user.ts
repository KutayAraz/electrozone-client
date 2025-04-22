import { ProfileSchema } from "../schemas/profile-schema";

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  role: string;
}

export type UpdateUser = Partial<ProfileSchema>;
