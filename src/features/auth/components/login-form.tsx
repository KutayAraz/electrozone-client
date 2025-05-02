import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { paths } from "@/config/paths";

import { LoginSchema, loginSchema } from "../schemas/login-schema";

import { AuthForm } from "./auth-form";

interface LoginFormProps {
  onSubmit: (data: LoginSchema) => void;
  isLoading: boolean;
  serverError?: {
    field: string;
    message: string;
  };
  onFieldChange?: (field: string) => void;
}

const inputClasses =
  "border-2 border-gray-300 rounded-md px-4 py-2 mt-1 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition duration-300";
const labelClasses = "text-gray-600 mt-2";
const errorMessageClasses = "text-red-500 text-sm mt-1";

export const LoginForm = ({ onSubmit, isLoading, serverError, onFieldChange }: LoginFormProps) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  return (
    <AuthForm
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid && !serverError}
      submitText="Login"
      loadingText="Logging in.."
      isLoading={isLoading}
      changeFormButton={
        <>
          <p className="mb-1 mt-2 text-center text-gray-600">Don&apos;t have an account yet?</p>
          <button
            type="button"
            onClick={() => navigate(paths.auth.register.getHref())}
            className="w-full rounded-lg bg-theme-orange py-2 font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-700"
          >
            Create your electrozone account
          </button>
        </>
      }
    >
      <h4 className="text-lg font-semibold text-gray-800">Welcome,</h4>

      <label htmlFor="email" className={labelClasses}>
        Email<span aria-hidden="true">*</span>
      </label>
      <input
        {...register("email", {
          onChange: () => {
            if (serverError?.field === "email") {
              onFieldChange?.("email");
            }
          },
        })}
        id="email"
        type="email"
        className={inputClasses}
        aria-required="true"
        required
      />
      {(errors.email || serverError?.field === "email") && (
        <p className={errorMessageClasses}>{errors.email?.message || serverError?.message}</p>
      )}

      <label htmlFor="password" className={labelClasses}>
        Password<span aria-hidden="true">*</span>
      </label>
      <input
        {...register("password", {
          onChange: () => {
            if (serverError?.field === "password") {
              onFieldChange?.("password");
            }
          },
        })}
        id="password"
        type="password"
        className={inputClasses}
        aria-required="true"
        required
      />
      {(errors.password || serverError?.field === "password") && (
        <p className={errorMessageClasses}>{errors.password?.message || serverError?.message}</p>
      )}
    </AuthForm>
  );
};
