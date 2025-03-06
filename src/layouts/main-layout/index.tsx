import { createTheme } from "@mui/material";
import { LoaderFunction, LoaderFunctionArgs, Outlet, ScrollRestoration } from "react-router-dom";

import { LoadingIndicator } from "@/components/ui/loading-bar";
import { clearbuyNowCart } from "@/stores/slices/buynow-cart-slice";
import { clearLocalcart } from "@/stores/slices/local-cart-slice";
import { CheckoutIntent } from "@/stores/slices/models";
import { setUserIntent, updateCartItemCount } from "@/stores/slices/user-slice";
import { store } from "@/stores/store";
import { checkHydration } from "@/utils/check-hydration";
import loaderFetch from "@/utils/loader-fetch";
import { Footer } from "@features/footer";
import { Header } from "@features/header";

export const MainLayout = () => {
  const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 450,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
  });

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

const mergeCartsAndSetIntent = async () => {
  const state = store.getState();
  let productsToOrder;

  const userIntent = state.user.userIntent;
  const buyNowCart = state.buyNowCart;

  if (!state.user.isAuthenticated) return;

  if (userIntent === CheckoutIntent.BUY_NOW) {
    productsToOrder = [buyNowCart];
  } else if (userIntent === CheckoutIntent.SESSION) {
    const localCartItems = state.localCart.items;
    productsToOrder = localCartItems.map((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
    }));
  }

  const result = await loaderFetch(
    `${import.meta.env.VITE_API_URL}/carts/merge-carts`,
    "PATCH",
    productsToOrder,
    true,
  );
  if (result?.data) {
    store.dispatch(setUserIntent(CheckoutIntent.NORMAL));
    store.dispatch(clearbuyNowCart());
    store.dispatch(clearLocalcart());
    store.dispatch(updateCartItemCount({ cartItemCount: result.data.totalQuantity }));
  }
};

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const currentPath = url.pathname;
  await checkHydration(store);
  const userIntent = store.getState().user.userIntent;

  if (
    currentPath !== "/checkout" &&
    currentPath !== "/sign-in" &&
    (userIntent == CheckoutIntent.BUY_NOW || userIntent === CheckoutIntent.SESSION)
  ) {
    mergeCartsAndSetIntent();
  }
  return null;
};
