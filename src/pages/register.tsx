import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { paths } from "@/config/paths";
import { useRegisterMutation } from "@/features/auth/api/register";
import { RegisterForm } from "@/features/auth/components/register-form";
import { RegisterSchema } from "@/features/auth/schemas/register-schema";
import { handleRegistrationError } from "@/features/auth/utils/error-handler";

export const RegisterPage = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

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
    } catch (error: unknown) {
      console.log("here");
      dispatch(displayNotification(handleRegistrationError(error)));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <RegisterForm isLoading={isLoading} onSubmit={handleRegisterSubmit} />
    </div>
  );
};
