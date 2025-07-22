import { useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { paths } from "@/config/paths";
import { useCartCount } from "@/features/cart/hooks/use-cart-count";
import { selectUser, userSlice } from "@/stores/slices/user-slice";
import BrandLogo from "@assets/brand-images/brand-logo.svg?react";
import Brand from "@assets/brand-images/brand.svg?react";
import BurgerIcon from "@assets/svgs/burger.svg?react";

import { LocationModal } from "./components/location/location-modal";
import { LocationSection } from "./components/location/location-section";
import { MenuModal } from "./components/navigation/menu-modal";
import { NavigationStrip } from "./components/navigation/navigation-strip";
import { SearchBar } from "./components/search/search-bar";
import { ProfileModal } from "./components/user/profile-modal";
import { UserSection } from "./components/user/user-section";

export const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const itemCount = useCartCount();

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  const headerContainerRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const smallScreenDevice = useMediaQuery("(max-width: 400px)");
  const path = location.pathname;

  const handleLocationSubmit = (location: string) => {
    dispatch(userSlice.actions.setGuestLocation({ city: location }));
    setLocationModalOpen(false);
  };

  // Check if the path starts with '/category' and has more segments following it
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Determine if navstrip should be shown
  const showHeaderExtras =
    !isMobile ||
    (!(pathSegments[0] === "category" && pathSegments.length >= 3) && !path.startsWith("/search"));

  // Simple scroll handler - make sticky after scrolling 50px past the entire header
  useEffect(() => {
    let headerHeight = 0;

    const calculateHeaderHeight = () => {
      if (headerContainerRef.current) {
        headerHeight = headerContainerRef.current.offsetHeight + 50;
      }
    };

    const handleScroll = () => {
      if (!headerHeight) calculateHeaderHeight();

      const shouldBeSticky = window.scrollY > headerHeight;
      setIsHeaderSticky(shouldBeSticky);
    };

    // Initial calculation
    calculateHeaderHeight();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", calculateHeaderHeight);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", calculateHeaderHeight);
    };
  }, []);

  return (
    <>
      {/* Spacer to prevent content jump when header becomes fixed */}
      {isHeaderSticky && <div style={{ height: headerContainerRef.current?.offsetHeight || 0 }} />}

      {/* Header Container */}
      <div
        ref={headerContainerRef}
        data-header-container
        className={`${
          isHeaderSticky ? "fixed top-0 left-0 right-0 z-40 shadow-lg" : ""
        } bg-theme-blue transition-all duration-300 ${isHeaderSticky ? "animate-slideDown" : ""}`}
        style={{
          transform: isHeaderSticky ? "translateY(0)" : undefined,
        }}
      >
        {/* Main Header Section */}
        <div
          className={`flex w-full items-center justify-between bg-theme-blue px-2 py-[5px] text-white sm:py-0`}
        >
          <div className="flex items-center">
            <BurgerIcon
              className="z-20 block sm:hidden"
              width={32}
              height={32}
              onClick={() => setMenuModalOpen(true)}
            />
            <Link
              to={paths.home.getHref()}
              className="mb-1 flex min-w-[136px] max-w-[60%] items-center sm:hidden"
            >
              <Brand className="" />
            </Link>
            <Link to={paths.home.getHref()} className="hidden max-w-[256px] sm:block">
              <BrandLogo />
            </Link>
            <LocationSection
              city={user.city}
              isSignedIn={user.isAuthenticated}
              onLocationClick={() => setLocationModalOpen(true)}
            />
          </div>
          <SearchBar className="mx-[3%] hidden h-10 max-w-[50%] text-gray-700 md:flex md:grow" />
          <UserSection
            firstName={user.firstName}
            isSignedIn={user.isAuthenticated}
            itemCount={itemCount}
            smallScreenDevice={smallScreenDevice}
            onProfileClick={() => setProfileModalOpen(true)}
          />
        </div>

        {/* Mobile Search Bar */}
        <div className={`bg-theme-blue px-2`}>
          <SearchBar className={`my-1 mb-2 h-8 w-full px-2 text-gray-700 md:hidden`} />
        </div>

        {/* Mobile Location Section, currently disabled */}
        {/* {showHeaderExtras && (
          <MobileLocationSection onLocationClick={() => setLocationModalOpen(true)} />
        )} */}
      </div>

      {/* Navigation Strip or Search Controls */}
      {showHeaderExtras && (
        <NavigationStrip className={`z-[3]`} onMenuClick={() => setMenuModalOpen(true)} />
      )}

      {/* Modals */}
      <LocationModal
        isOpen={locationModalOpen}
        onClose={() => {
          setLocationModalOpen(false);
        }}
        onLocationSubmit={handleLocationSubmit}
        city={user.city}
      />

      <ProfileModal
        isOpen={profileModalOpen}
        isSignedIn={user.isAuthenticated}
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
