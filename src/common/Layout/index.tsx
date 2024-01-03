import { LoaderFunction, Outlet, useLocation, useNavigation } from "react-router-dom";
import Footer from "./Footer/index";
import NavStrip from "./NavStrip";
import Header from "./Header";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "@/setup/store";
import { CheckoutIntent } from "@/setup/slices/models";
import { setUserIntent, updateCartItemCount } from "@/setup/slices/user-slice";
import { clearbuyNowCart } from "@/setup/slices/buyNowCart-slice";
import { clearLocalcart } from "@/setup/slices/localCart-slice";
import UserLocation from "./UserLocation";
import { Alert } from "@mui/material";
import { hideAlert } from "@/setup/slices/alert-slice";
import { checkHydration } from "@/utils/check-hydration";
import loaderFetch from "@/utils/loader-fetch";
import LoadingIndicator from "../LoadingBar";

const Layout = () => {
  const dispatch = useDispatch();
  const alertState = useSelector((state: RootState) => state.alert);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const navigation = useNavigation()

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerHeight = headerRef.current.offsetHeight;
        const offset = window.scrollY;
        setIsScrolled(offset > headerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-theme-blue px-[2%] md:px-3" ref={headerRef}>
        <Header isScrolled={isScrolled} />
        <NavStrip />
      </div>
      <UserLocation />
      <LoadingIndicator />
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

const mergeCartsAndSetIntent = async () => {
  const state = store.getState();
  let productsToOrder;

  const userIntent = state.user.userIntent;
  const buyNowCart = state.buyNowCart

  if (!state.user.isSignedIn) return;

  if (userIntent === CheckoutIntent.Instant) {
    productsToOrder = [buyNowCart];
  } else if (userIntent === CheckoutIntent.Local) {
    const localCartItems = state.localCart.items;
    productsToOrder = localCartItems.map((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
    }));
  }

  const result = await loaderFetch(`${import.meta.env.VITE_API_URL}/carts/merge-carts`,
    "PATCH",
    productsToOrder,
    true)
  if (result?.data) {
    store.dispatch(setUserIntent(CheckoutIntent.Normal));
    store.dispatch(clearbuyNowCart());
    store.dispatch(clearLocalcart());
    store.dispatch(updateCartItemCount({ cartItemCount: result.data.totalQuantity }))
  }
}

export const loader: LoaderFunction = async ({ request }: any) => {
  const url = new URL(request.url);
  const currentPath = url.pathname;
  await checkHydration(store)
  const userIntent = store.getState().user.userIntent;

  if (currentPath !== "/checkout" &&
    currentPath !== "/sign-in" &&
    (userIntent == CheckoutIntent.Instant ||
      userIntent === CheckoutIntent.Local)) {
    mergeCartsAndSetIntent()
  }
  return null;
}
