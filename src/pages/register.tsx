import { PageHelmet } from "@/components/seo/page-helmet";
import { RegisterForm } from "@/features/auth/components/register-form";
import { useRegister } from "@/features/auth/hooks/use-register";

export const RegisterPage = () => {
  const { submitRegister, serverError, clearServerError, isLoading } = useRegister();

  return (
    <>
      <PageHelmet
        title="Sign Up | Electrozone"
        description="Create a new account at Electrozone to enjoy personalized services, faster checkout, and special offers."
      />
      <div className="container mx-auto px-4 py-8">
        <RegisterForm
          onSubmit={submitRegister}
          isLoading={isLoading}
          serverError={serverError}
          onFieldChange={clearServerError}
        />
      </div>
    </>
  );
};
