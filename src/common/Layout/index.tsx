import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer/index";
import NavStrip from "./NavStrip";
import Header from "./Header";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "@/setup/store";
import { CheckoutIntent } from "@/setup/slices/models";
import { setUserIntent } from "@/setup/slices/user-slice";
import { clearbuyNowCart } from "@/setup/slices/buyNowCart-slice";
import { clearLocalcart } from "@/setup/slices/localCart-slice";
import UserLocation from "./UserLocation";
import { Alert } from "@mui/material";
import { hideAlert } from "@/setup/slices/alert-slice";
import useFetch from "../Hooks/use-fetch";
import { checkHydration } from "@/utils/check-hydration";

const Layout = () => {
  const location = useLocation();
  const userIntent = useSelector((state: RootState) => state.user.userIntent);
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const buyNowCartItem = useSelector((state: RootState) => state.buyNowCart);
  const alertState = useSelector((state: RootState) => state.alert);
  const { fetchData } = useFetch();
  const headerRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const mergeCartsAndSetIntent = async () => {
    await checkHydration(store);
    let productsToOrder;

    if (userIntent === CheckoutIntent.Instant) {
      productsToOrder = [buyNowCartItem];
    } else if (userIntent === CheckoutIntent.Local) {
      const localCartItems = store.getState().localCart.items;
      productsToOrder = localCartItems.map((item: any) => ({
        productId: item.id,
        quantity: item.quantity,
      }));
    }

    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/carts/merge-carts`,
      "PATCH",
      productsToOrder,
      true
    );
    if (result?.response.ok) {
      dispatch(setUserIntent(CheckoutIntent.Normal));
      dispatch(clearbuyNowCart());
      dispatch(clearLocalcart());
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
      (async () => {
        await checkHydration(store);
        await mergeCartsAndSetIntent();
      })();
    }
  }, [location.pathname, userIntent]);

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
