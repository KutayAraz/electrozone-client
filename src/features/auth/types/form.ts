import { LoginSchema } from "../schemas/login-schema";
import { RegisterSchema } from "../schemas/register-schema";

export interface LoginFormProps {
  onSubmit: (data: LoginSchema) => void;
  isLoading: boolean;
  serverError?: {
    field: string;
    message: string;
  };
  onFieldChange?: (field: string) => void;
}

export interface RegisterFormProps {
  onSubmit: (data: RegisterSchema) => void;
  isLoading: boolean;
  serverError?: {
    field: string;
    message: string;
  };
  onFieldChange?: (field: string) => void;
}
