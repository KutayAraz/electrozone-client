import { LoginForm } from "@/features/auth/components/login-form";
import { RedirectAuthenticated } from "@/features/auth/components/redirect-authenticated";
import { useLogin } from "@/features/auth/hooks/use-login";

export const LoginPage = () => {
  const { submitLogin, isLoading, serverError, clearServerError } = useLogin();

  return (
    <RedirectAuthenticated>
      <div className="max-w-md flex flex-col mx-auto px-4 py-8">
        <LoginForm
          isLoading={isLoading}
          onSubmit={submitLogin}
          serverError={serverError}
          onFieldChange={clearServerError}
        />
      </div>
    </RedirectAuthenticated>
  );
};
