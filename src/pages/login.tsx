import { useDispatch } from "react-redux";

import { useLoginMutation } from "@/features/auth/api/login";
import { LoginForm } from "@/features/auth/components/login-form";
import { LoginSchema } from "@/features/auth/schemas/login-schema";
import { setCredentials } from "@/stores/slices/user-slice";

export const LoginPage = () => {
  const dispatch = useDispatch();

  const [login, { isLoading: isLoginLoading }] = useLoginMutation();

  const handleLoginSubmit = async (data: LoginSchema) => {
    try {
      const response = await login(data).unwrap();

      // Update user state with response data
      dispatch(
        setCredentials({
          firstName: response.firstName,
          city: response.city,
          email: response.email,
          cartItemCount: response.cartItemCount || 0,
        }),
      );
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <LoginForm isLoading={isLoginLoading} onSubmit={handleLoginSubmit} />
    </div>
  );
};
