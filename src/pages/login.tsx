import { PageHelmet } from "@/components/seo/PageHelmet";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { useLogin } from "@/features/auth/hooks/useLogin";

export const LoginPage = () => {
  const { submitLogin, isLoading, serverError, clearServerError } = useLogin();

  return (
    <>
      <PageHelmet
        title="Login | Electrozone"
        description="Access your Electrozone account to manage your purchases, track orders, and update your preferences."
      />
      <div className="max-w-md flex flex-col mx-auto px-4 py-8">
        <LoginForm
          isLoading={isLoading}
          onSubmit={submitLogin}
          serverError={serverError}
          onFieldChange={clearServerError}
        />
      </div>
    </>
  );
};
