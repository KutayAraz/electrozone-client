import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/index";
import NavStrip from "./NavStrip";
import Header from "./Header";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "@/setup/store";
import { CheckoutIntent } from "@/setup/slices/models";
import { setUserIntent } from "@/setup/slices/user-slice";
import { clearbuyNowCart } from "@/setup/slices/buyNowCart-slice";
import { clearLocalcart } from "@/setup/slices/localCart-slice";
import { selectAccessToken } from "@/setup/slices/auth-slice";
import fetchNewAccessToken from "@/utils/renew-token";
import { checkHydration } from "@/utils/check-hydration";
import UserLocation from "./UserLocation";
import { Alert } from "@mui/material";
import { hideAlert } from "@/setup/slices/alert-slice";

const Layout = () => {
  const location = useLocation();
  const userIntent = useSelector((state: RootState) => state.user.userIntent);
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const accessToken = useSelector(selectAccessToken);
  const buyNowCartItem = useSelector((state: RootState) => state.buyNowCart);
  const alertState = useSelector((state: RootState) => state.alert);

  const mergeCartsAndSetIntent = async () => {
    await checkHydration(store);
    let productsToOrder;
    let token = accessToken;

    if (userIntent === CheckoutIntent.Instant) {
      productsToOrder = [buyNowCartItem];
    } else if (userIntent === CheckoutIntent.Local) {
      const localCartItems = store.getState().localCart.items;
      productsToOrder = localCartItems.map((item: any) => ({
        productId: item.id,
        quantity: item.quantity,
      }));
    }

    if (!token) {
      token = await fetchNewAccessToken();
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/carts/merge-carts`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productsToOrder),
        }
      );

      if (response.ok) {
        dispatch(clearbuyNowCart());
        dispatch(clearLocalcart());
        dispatch(setUserIntent(CheckoutIntent.Normal));
      }
    } catch (error) {
      console.error("Error merging carts:", error);
    }
  };

  useEffect(() => {
    if (!isSignedIn) return;
    if (
      location.pathname !== "/checkout" &&
      location.pathname !== "/sign-in" &&
      (userIntent == CheckoutIntent.Instant ||
        userIntent === CheckoutIntent.Local)
    ) {
      console.log("Conditions met. Calling mergeCartsAndSetIntent.");
      (async () => {
        await mergeCartsAndSetIntent();
      })();
    }
  }, [location.pathname, userIntent]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-theme-blue px-[2%] md:px-3">
        <Header />
        <NavStrip />
      </div>
      <UserLocation />
      {alertState.isOpen && (
        <Alert
          severity={alertState.type}
          onClose={() => dispatch(hideAlert())}
          className="fixed w-full top-0 z-10 "
          style={{ borderRadius: 0 }}
        >
          {alertState.message}
        </Alert>
      )}
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
