import { useMediaQuery } from "@mui/material";
import { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { toggleMenuDrawer } from "@/stores/slices/ui-slice";
import { userSlice } from "@/stores/slices/user-slice";
import { RootState } from "@/stores/store";
import { ReactComponent as BrandLogo } from "@assets/brand-images/brand-logo.svg";
import { ReactComponent as Brand } from "@assets/brand-images/brand.svg";
import { ReactComponent as BurgerIcon } from "@assets/svgs/burger.svg";

import { LocationModal } from "./components/location-modal";
import { LocationSection } from "./components/location-section";
import MenuModal from "./components/menu-modal";
import { ProfileModal } from "./components/profile-modal";
import { SearchBar } from "./components/search-bar";
import { UserSection } from "./components/user-section";

export const Header = forwardRef<HTMLDivElement, { className: string }>((props, ref) => {
  const firstName = useSelector((state: any) => state.user.firstName);
  const city = useSelector((state: any) => state.user.city);
  const dispatch = useDispatch();
  const isMenuDrawerOpen = useSelector((state: RootState) => state.ui.menuDrawer);
  const isSignedIn = firstName && city;
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const navigate = useNavigate();
  const smallScreenDevice = useMediaQuery("(max-width: 400px)");

  const localCartQuantity = useSelector((state: RootState) => state.localCart.totalQuantity);

  const cartQuantity = useSelector((state: RootState) => state.user.cartItemCount);

  const itemCount = isSignedIn ? cartQuantity : localCartQuantity;

  const handleLocationSubmit = (location: string) => {
    dispatch(userSlice.actions.setGuestLocation({ city: location }));
    setIsLocationModalOpen(false);
  };

  return (
    <div ref={ref} className={props.className}>
      <div
        className={`flex w-full items-center justify-between bg-theme-blue px-2 py-[5px] text-white sm:py-0 `}
      >
        <div className="flex items-center">
          <BurgerIcon
            className="z-20 block sm:hidden"
            width={32}
            height={32}
            onClick={() => dispatch(toggleMenuDrawer(true))}
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
            onLocationClick={() => setIsLocationModalOpen(true)}
          />
        </div>
        <SearchBar className="mx-[3%] hidden h-10 max-w-[50%] text-gray-700 md:flex md:grow" />
        <UserSection
          firstName={firstName}
          isSignedIn={isSignedIn}
          itemCount={itemCount}
          smallScreenDevice={smallScreenDevice}
          onProfileClick={() => setIsProfileModalOpen(true)}
          onSignInClick={() => navigate("/sign-in")}
        />
      </div>
      <div className="px-2">
        <SearchBar className={`my-1 mb-2 h-8 w-full text-gray-700 md:hidden`} />
      </div>

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onLocationSubmit={handleLocationSubmit}
        city={city}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        isSignedIn={isSignedIn}
        onClose={() => setIsProfileModalOpen(false)}
      />
      <MenuModal isOpen={isMenuDrawerOpen} />
    </div>
  );
});

Header.displayName = "Header";
