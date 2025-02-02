import { Alert, Slide, createTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { LoaderFunction, LoaderFunctionArgs, Outlet, ScrollRestoration } from "react-router-dom";

import { LoadingIndicator } from "@/components/ui/loading-bar";
import { hideAlert } from "@/stores/slices/alert-slice";
import { clearbuyNowCart } from "@/stores/slices/buynow-cart-slice";
import { clearLocalcart } from "@/stores/slices/local-cart-slice";
import { CheckoutIntent } from "@/stores/slices/models";
import { setUserIntent, updateCartItemCount } from "@/stores/slices/user-slice";
import { RootState, store } from "@/stores/store";
import { checkHydration } from "@/utils/check-hydration";
import loaderFetch from "@/utils/loader-fetch";
import { Footer } from "@features/footer";
import { Header } from "@features/header";

export const MainLayout = () => {
  const dispatch = useDispatch<any>();
  const notifications = useSelector((state: RootState) => state.alert.notifications);

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
      <div className="fixed right-0 top-0 z-20 xs:top-2 sm:top-28">
        {notifications.map((alert: any) => (
          <Slide key={alert.id} direction="left" in={true} mountOnEnter unmountOnExit>
            <Alert
              severity={alert.type}
              onClose={() => dispatch(hideAlert(alert.id))}
              className="mb-2"
              style={{ borderRadius: 0 }}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  fontSize: "12px",
                },
              }}
            >
              {alert.message}
            </Alert>
          </Slide>
        ))}
      </div>
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

  if (!state.user.isSignedIn) return;

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
