import { PageHelmet } from "@/components/seo/PageHelmet";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { useLogin } from "@/features/auth/hooks/useLogin";
import { useCartCount } from "@/features/cart/hooks/useCartCount";
import { useMergeCarts } from "@/features/cart/hooks/useMergeCarts";
import { shouldMergeGuestCartOnLogin } from "@/features/cart/utils/should-merge-guest-cart";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectCheckoutIntent } from "@/stores/slices/user-slice";

export const LoginPage = () => {
  // Read while still a guest, so this is the guest cart's item count
  const guestCartCount = useCartCount();
  const checkoutIntent = useAppSelector(selectCheckoutIntent);
  const { submitMergeCarts } = useMergeCarts();

  const { submitLogin, isLoading, serverError, clearServerError } = useLogin({
    onLoggedIn: async () => {
      if (shouldMergeGuestCartOnLogin(guestCartCount, checkoutIntent)) {
        await submitMergeCarts();
      }
    },
  });

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
