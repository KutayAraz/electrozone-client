import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { selectUser, userSlice } from "@/stores/slices/user-slice";
import { ReactComponent as BrandLogo } from "@assets/brand-images/brand-logo.svg";
import { ReactComponent as Brand } from "@assets/brand-images/brand.svg";
import { ReactComponent as BurgerIcon } from "@assets/svgs/burger.svg";

import { LocationModal } from "./components/location/location-modal";
import { LocationSection } from "./components/location/location-section";
import { MobileLocationSection } from "./components/location/mobile-location-section";
import { MenuModal } from "./components/navigation/menu-modal";
import { NavigationStrip } from "./components/navigation/navigation-strip";
import { SearchBar } from "./components/search/search-bar";
import { SearchControls } from "./components/search/search-controls";
import { ProfileModal } from "./components/user/profile-modal";
import { UserSection } from "./components/user/user-section";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectUser);

  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const smallScreenDevice = useMediaQuery("(max-width: 400px)");
  const path = location.pathname;

  const handleLocationSubmit = (location: string) => {
    dispatch(userSlice.actions.setGuestLocation({ city: location }));
    setLocationModalOpen(false);
  };

  // Check if the path starts with '/category' and has more segments following it
  const pathSegments = location.pathname.split("/").filter(Boolean); // Split path and remove empty segments

  // Determine if navstrip should be shown
  const showHeaderExtras =
    !isMobile ||
    (!(pathSegments[0] === "category" && pathSegments.length >= 3) && !path.startsWith("/search"));

  return (
    <>
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
          <Link to={"/"} className="mb-1 flex min-w-[136px] max-w-[60%] items-center sm:hidden">
            <Brand className="" />
          </Link>
          <Link to={"/"} className="hidden max-w-[256px] sm:block">
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
          onSignInClick={() => navigate("/sign-in")}
        />
      </div>

      <div className={`bg-theme-blue px-2`}>
        <SearchBar className={`my-1 mb-2 h-8 w-full px-2 text-gray-700 md:hidden`} />
      </div>

      {showHeaderExtras ? (
        <NavigationStrip
          className={`z-[3] transition-all duration-200 `}
          onMenuClick={() => setMenuModalOpen(true)}
        />
      ) : (
        <SearchControls className={`z-[3] transition-all duration-200 `} />
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
