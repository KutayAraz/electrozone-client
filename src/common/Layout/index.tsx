import { LoaderFunction, Outlet, ScrollRestoration, useLocation, useNavigation, useParams } from "react-router-dom";
import Footer from "./Footer/index";
import NavStrip from "./NavStrip";
import Header from "./Header";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "@/setup/store";
import { CheckoutIntent } from "@/setup/slices/models";
import { setUserIntent, updateCartItemCount } from "@/setup/slices/user-slice";
import { clearbuyNowCart } from "@/setup/slices/buyNowCart-slice";
import { clearLocalcart } from "@/setup/slices/localCart-slice";
import UserLocation from "./UserLocation";
import { Alert, Slide, createTheme, useMediaQuery } from "@mui/material";
import { hideAlert } from "@/setup/slices/alert-slice";
import { checkHydration } from "@/utils/check-hydration";
import loaderFetch from "@/utils/loader-fetch";
import LoadingIndicator from "../LoadingBar";
import { debounce } from "@/utils/debounce";
import { SearchControls } from "./SearchControls";

const Layout = () => {
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const path = location.pathname;
  const isMobile = useMediaQuery("(max-width: 768px)");
  const notifications = useSelector((state: RootState) => state.alert.notifications);

  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

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
  const pathSegments = location.pathname.split('/').filter(Boolean); // Split path and remove empty segments

  // Determine if you should show the nav strip
  const showHeaderExtras = !isMobile || !(pathSegments[0] === 'category' && pathSegments.length >= 3) && !path.startsWith('/search');

  const throttle = (func: () => void, limit: number) => {
    let inThrottle: boolean;
    return function () {
      if (!inThrottle) {
        func();
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  const handleScroll = useCallback(throttle(() => {
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
    const newScrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
    if (newScrollDirection !== scrollDirection) {
      setScrollDirection(newScrollDirection);
    }

    // Update last scroll position
    setLastScrollY(currentScrollY);
  }, 100), [lastScrollY, headerHeight, isSticky, scrollDirection]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header ref={headerRef}
        className={`bg-theme-blue z-[4] ${isSticky ? "sticky top-0 transition-all duration-200" : "block top-[-64px]"}`}
      />
      {(showHeaderExtras) ? <NavStrip
        className={`transition-all duration-200 z-[3] ${!isSticky ? "block" : "sticky"}`}
        style={isSticky && scrollDirection === "up" ? { top: `${headerHeight}px` } : { top: "-64px" }}
      /> : <SearchControls
        className={`transition-all duration-200 z-[3] ${!isSticky ? "block" : "sticky"}`}
        style={isSticky && scrollDirection === "up" ? { top: `${headerHeight}px` } : { top: "-64px" }}
      />}
      {showHeaderExtras && <UserLocation />}

      <LoadingIndicator />
      <div className="fixed right-0 top-0 xs:top-2 sm:top-28 z-[20]">
        {notifications.map((alert) => (
          <Slide
            key={alert.id}
            direction="left"
            in={true}
            mountOnEnter
            unmountOnExit
          >
            <Alert
              severity={alert.type}
              onClose={() => dispatch(hideAlert(alert.id))}
              className="mb-2"
              style={{ borderRadius: 0 }}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  fontSize: "12px"
                },
              }}
            >
              {alert.message}
            </Alert>
          </Slide>
        ))}
      </div>
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
      <ScrollRestoration />
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

  const result = await loaderFetch(`${import.meta.env.VITE_API_URL} /carts/merge-carts`,
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
