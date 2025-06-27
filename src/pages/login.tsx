import { LoginForm } from "@/features/auth/components/login-form";
import { useLogin } from "@/features/auth/hooks/use-login";

export const LoginPage = () => {
  const { submitLogin, isLoading, serverError, clearServerError } = useLogin();

  return (
    <div className="max-w-md flex flex-col mx-auto px-4 py-8">
      <LoginForm
        isLoading={isLoading}
        onSubmit={submitLogin}
        serverError={serverError}
        onFieldChange={clearServerError}
      />
    </div>
  );
};
