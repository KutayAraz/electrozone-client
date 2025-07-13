import { LoaderFunctionArgs, Outlet, ScrollRestoration } from "react-router-dom";

import { LoadingIndicator } from "@/components/ui/loading-bar";
import { paths } from "@/config/paths";
import { mergeCartsApi } from "@/features/cart/api/user-cart/merge-carts";
import { CheckoutIntent } from "@/stores/slices/models";
import { setUserIntent } from "@/stores/slices/user-slice";
import { store } from "@/stores/store";
import { CheckoutType } from "@/types/checkout";

import { Footer } from "./footer";
import { Header } from "./header";

export const mainLayoutLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const currentPath = url.pathname;
  const checkoutIntent = store.getState().user.checkoutIntent;

  if (
    currentPath !== paths.checkout.root.getHref() &&
    currentPath !== paths.auth.login.getHref() &&
    (checkoutIntent === CheckoutType.SESSION || checkoutIntent === CheckoutType.BUY_NOW)
  ) {
    if (checkoutIntent === CheckoutType.SESSION)
      await store.dispatch(mergeCartsApi.endpoints.mergeCarts.initiate());
    store.dispatch(setUserIntent(CheckoutIntent.NORMAL));
  }
  return null;
};

export const MainLayout = () => {
  return (
    <div className="mx-auto flex min-h-screen flex-col">
      <Header />
      <LoadingIndicator />
      <div className="grow">
        <Outlet />
      </div>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};
