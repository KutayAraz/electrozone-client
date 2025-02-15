import { LoginSchema } from "../schemas/login-schema";
import { RegisterSchema } from "../schemas/register-schema";

export interface LoginFormProps {
  onSubmit: (data: LoginSchema) => void;
  isLoading: boolean;
}

export interface RegisterFormProps {
  onSubmit: (data: RegisterSchema) => void;
  isLoading: boolean;
}
