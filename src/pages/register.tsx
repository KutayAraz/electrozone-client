import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { paths } from "@/config/paths";
import { useRegisterMutation } from "@/features/auth/api/register";
import { RegisterForm } from "@/features/auth/components/register-form";
import { useFormError } from "@/features/auth/hooks/use-form-error";
import { RegisterSchema } from "@/features/auth/schemas/register-schema";
import { isApiError } from "@/types/api";

export const RegisterPage = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { serverError, setServerError, clearServerError } = useFormError();
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegisterSubmit = async (data: RegisterSchema) => {
    try {
      await register(data).unwrap();

      dispatch(
        displayNotification({
          type: NotificationType.SUCCESS,
          message: "You have registered successfully. You can now login!",
          autoHide: true,
          duration: 5000,
        }),
      );
      navigate(paths.auth.login.getHref());
    } catch (error) {
      // Using type guard to ensure type safety
      if (isApiError(error)) {
        if (error.status === 409) {
          setServerError({
            field: "email",
            message: "This email is already taken",
          });
        }

        dispatch(
          displayNotification({
            type: NotificationType.ERROR,
            message: error.data.message,
            autoHide: true,
            duration: 5000,
          }),
        );
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <RegisterForm
        onSubmit={handleRegisterSubmit}
        isLoading={isLoading}
        serverError={serverError}
        onFieldChange={clearServerError}
      />
    </div>
  );
};
