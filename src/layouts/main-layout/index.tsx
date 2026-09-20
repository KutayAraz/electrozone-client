import { LoaderFunctionArgs, Outlet, ShouldRevalidateFunction } from "react-router-dom";

import { LoadingIndicator } from "@/components/ui/loading-bar";
import { paths } from "@/config/paths";
import { mergeCartsApi } from "@/features/cart/api/user-cart/merge-carts";
import { setUserIntent } from "@/stores/slices/user-slice";
import { store } from "@/stores/store";
import { CheckoutType } from "@/types/checkout";

import { Footer } from "./footer";
import { Header } from "./header";

// Login and register are both part of the login step of a checkout
const isAuthPath = (pathname: string) => pathname.startsWith("/auth/");

export const mainLayoutLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const currentPath = url.pathname;
  const { checkoutIntent, isAuthenticated } = store.getState().user;

  if (
    currentPath !== paths.checkout.root.getHref() &&
    !isAuthPath(currentPath) &&
    (checkoutIntent === CheckoutType.SESSION || checkoutIntent === CheckoutType.BUY_NOW)
  ) {
    // Merging moves the guest cart into the user's cart, so it needs a signed-in user.
    // A guest who abandoned the login step keeps their session cart as it is.
    if (checkoutIntent === CheckoutType.SESSION && isAuthenticated)
      await store.dispatch(mergeCartsApi.endpoints.mergeCarts.initiate());

    store.dispatch(setUserIntent(CheckoutType.NORMAL));
  }
  return null;
};

// The layout stays mounted across its pages, so React Router wouldn't re-run the loader
// above when a guest leaves the login step for another page. Re-running it there drops
// the checkout intent of an abandoned login.
export const shouldRevalidateMainLayout: ShouldRevalidateFunction = ({
  currentUrl,
  nextUrl,
  defaultShouldRevalidate,
}) => (isAuthPath(currentUrl.pathname) && !isAuthPath(nextUrl.pathname)) || defaultShouldRevalidate;

export const MainLayout = () => {
  return (
    <div className="mx-auto flex min-h-screen flex-col">
      <Header />

      <LoadingIndicator />

      <div className="grow">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};
