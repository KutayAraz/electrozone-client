import { Alert, Slide, createTheme, useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LoaderFunction,
  LoaderFunctionArgs,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router-dom";

import { LoadingIndicator } from "@/components/ui/loading-bar/loading-bar";
import { hideAlert } from "@/stores/slices/alert-slice";
import { clearbuyNowCart } from "@/stores/slices/buynow-cart-slice";
import { clearLocalcart } from "@/stores/slices/local-cart-slice";
import { CheckoutIntent } from "@/stores/slices/models";
import { setUserIntent, updateCartItemCount } from "@/stores/slices/user-slice";
import { RootState, store } from "@/stores/store";
import { checkHydration } from "@/utils/check-hydration";
import loaderFetch from "@/utils/loader-fetch";

import { Footer } from "./footer/footer";
import { Header } from "./header";
import { SearchControls } from "./header/components/search-controls";
import { UserLocation } from "./header/components/user-location";

export const MainLayout = () => {
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const path = location.pathname;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const notifications = useSelector((state: RootState) => state.alert.notifications);

  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

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
  // Check if the path starts with '/category' and has more segments following it
  const pathSegments = location.pathname.split("/").filter(Boolean); // Split path and remove empty segments

  // Determine if you should show the nav strip
  const showHeaderExtras =
    !isMobile ||
    (!(pathSegments[0] === "category" && pathSegments.length >= 3) && !path.startsWith("/search"));

  const throttle = (func: () => void, limit: number) => {
    let inThrottle: boolean;
    return function () {
      if (!inThrottle) {
        func();
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  const handleScroll = useCallback(
    throttle(() => {
      const currentScrollY = window.scrollY;

      // Calculate and update header height only if needed
      if (headerRef.current && headerHeight !== headerRef.current.offsetHeight) {
        setHeaderHeight(headerRef.current.offsetHeight - 2);
      }

      // Calculate and update stickiness only if needed
      const shouldBeSticky = currentScrollY > headerHeight + 75;
      if (isSticky !== shouldBeSticky) {
        setIsSticky(shouldBeSticky);
      }

      // Determine scroll direction only if changed
      const newScrollDirection = currentScrollY > lastScrollY ? "down" : "up";
      if (newScrollDirection !== scrollDirection) {
        setScrollDirection(newScrollDirection);
      }

      // Update last scroll position
      setLastScrollY(currentScrollY);
    }, 100),
    [lastScrollY, headerHeight, isSticky, scrollDirection],
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="mx-auto flex min-h-screen max-w-screen-xl flex-col">
      <Header
        ref={headerRef}
        className={`z-[4] bg-theme-blue ${
          isSticky ? "sticky top-0 transition-all duration-200" : "top-[-64px] block"
        }`}
      />
      {!showHeaderExtras && (
        <SearchControls
          className={`z-[3] transition-all duration-200 ${!isSticky ? "block" : "sticky"}`}
          style={
            isSticky && scrollDirection === "up" ? { top: `${headerHeight}px` } : { top: "-64px" }
          }
        />
      )}
      {showHeaderExtras && <UserLocation />}

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
