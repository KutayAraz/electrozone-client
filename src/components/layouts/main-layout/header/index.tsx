import { useMediaQuery } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { userSlice } from "@/stores/slices/user-slice";
import { RootState } from "@/stores/store";
import { ReactComponent as BrandLogo } from "@assets/brand-images/brand-logo.svg";
import { ReactComponent as Brand } from "@assets/brand-images/brand.svg";
import { ReactComponent as BurgerIcon } from "@assets/svgs/burger.svg";

import { LocationSection } from "./components/location-section";
import { MobileLocationSection } from "./components/mobile-location-section";
import { LocationModal } from "./components/modals/location-modal";
import { MenuModal } from "./components/modals/menu-modal";
import { ProfileModal } from "./components/modals/profile-modal";
import { NavigationStrip } from "./components/navigation-strip";
import { SearchBar } from "./components/search-bar";
import SearchControls from "./components/search-controls";
import { UserSection } from "./components/user-section";

export const Header = () => {
  const navigate = useNavigate();
  const firstName = useSelector((state: any) => state.user.firstName);
  const city = useSelector((state: RootState) => state.user.city);
  const dispatch = useDispatch();
  const isSignedIn = firstName && city;
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");
  const smallScreenDevice = useMediaQuery("(max-width: 400px)");
  const path = location.pathname;
  const isMobile = useMediaQuery("(max-width: 768px)");

  const localCartQuantity = useSelector((state: RootState) => state.localCart.totalQuantity);

  const cartQuantity = useSelector((state: RootState) => state.user.cartItemCount);

  const itemCount = isSignedIn ? cartQuantity : localCartQuantity;

  const handleLocationSubmit = (location: string) => {
    dispatch(userSlice.actions.setGuestLocation({ city: location }));
    setLocationModalOpen(false);
  };

  // Check if the path starts with '/category' and has more segments following it
  const pathSegments = location.pathname.split("/").filter(Boolean); // Split path and remove empty segments

  // Determine if you should show the nav strip
  const showHeaderExtras =
    !isMobile ||
    (!(pathSegments[0] === "category" && pathSegments.length >= 3) && !path.startsWith("/search"));

  console.log(showHeaderExtras, isSticky, scrollDirection, headerHeight);

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
    <>
      <div
        ref={headerRef}
        className={`z-[4] flex w-full items-center justify-between bg-theme-blue px-2 py-[5px] text-white sm:py-0 ${
          isSticky ? "sticky top-0 transition-all duration-200" : "top-[-64px] block"
        }`}
      >
        <div className="flex items-center">
          <BurgerIcon
            className="z-20 block sm:hidden"
            width={32}
            height={32}
            onClick={() => setMenuModalOpen(true)}
          />
          <Link to={"/"} className="mb-1 flex min-w-[136px] max-w-[60%] items-center sm:hidden">
            <Brand className="" />
          </Link>
          <Link to={"/"} className="hidden max-w-[256px] sm:block">
            <BrandLogo />
          </Link>
          <LocationSection
            city={city}
            isSignedIn={isSignedIn}
            onLocationClick={() => setLocationModalOpen(true)}
          />
        </div>
        <SearchBar className="mx-[3%] hidden h-10 max-w-[50%] text-gray-700 md:flex md:grow" />
        <UserSection
          firstName={firstName}
          isSignedIn={isSignedIn}
          itemCount={itemCount}
          smallScreenDevice={smallScreenDevice}
          onProfileClick={() => setProfileModalOpen(true)}
          onSignInClick={() => navigate("/sign-in")}
        />
      </div>

      <div
        className={`px-2 ${
          isSticky ? "sticky z-[4] transition-all duration-200" : "block"
        } bg-theme-blue`}
        style={isSticky ? { top: `${headerHeight}px` } : { top: "-64px" }}
      >
        <SearchBar className={`my-1 mb-2 h-8 w-full px-2 text-gray-700 md:hidden`} />
      </div>

      {showHeaderExtras ? (
        <NavigationStrip
          className={`z-[3] transition-all duration-200 ${!isSticky ? "block" : "sticky"}`}
          style={
            isSticky && scrollDirection === "up"
              ? { top: `calc(${headerHeight}px + 38px)` }
              : { top: "-64px" }
          }
          onMenuClick={() => setMenuModalOpen(true)}
        />
      ) : (
        <SearchControls
          className={`z-[3] transition-all duration-200 ${!isSticky ? "block" : "sticky"}`}
          style={
            isSticky && scrollDirection === "up"
              ? { top: `calc(${headerHeight}px + 42px)` }
              : { top: "-64px" }
          }
        />
      )}
      {showHeaderExtras && (
        <MobileLocationSection onLocationClick={() => setLocationModalOpen(true)} />
      )}

      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => {
          setLocationModalOpen(false);
        }}
        onLocationSubmit={handleLocationSubmit}
        city={city}
      />

      <ProfileModal
        isOpen={profileModalOpen}
        isSignedIn={isSignedIn}
        onClose={() => setProfileModalOpen(false)}
      />
      <MenuModal
        isOpen={menuModalOpen}
        onClose={() => {
          setMenuModalOpen(false);
        }}
      />
    </>
  );
};

Header.displayName = "Header";
