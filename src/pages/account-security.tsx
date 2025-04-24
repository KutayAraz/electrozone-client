import { PasswordForm } from "@/features/user/components/password-form";
import { useChangePassword } from "@/features/user/hooks/use-change-password";

export const AccountSecurityPage = () => {
  const { submitPassword, isLoading } = useChangePassword();

  return <PasswordForm onChangePassword={submitPassword} isUpdating={isLoading} />;
};
