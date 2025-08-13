import { PageHelmet } from "@/components/seo/page-helmet";
import { PasswordForm } from "@/features/user/components/password-form";
import { useChangePassword } from "@/features/user/hooks/use-change-password";

export const AccountSecurityPage = () => {
  const { submitPassword, isLoading } = useChangePassword();

  return (
    <>
      <PageHelmet
        title="Account Security | Electrozone"
        description="Change your password to ensure your Electrozone account remains secure."
      />
      <PasswordForm onChangePassword={submitPassword} isUpdating={isLoading} />{" "}
    </>
  );
};
