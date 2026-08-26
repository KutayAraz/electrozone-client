import { PageHelmet } from "@/components/seo/PageHelmet";
import { PasswordForm } from "@/features/user/components/PasswordForm";
import { useChangePassword } from "@/features/user/hooks/useChangePassword";

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
