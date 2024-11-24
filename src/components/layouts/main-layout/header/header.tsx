import { ReactComponent as BrandLogo } from "@assets/brand/brand-logo.svg";
import { ReactComponent as Brand } from "@assets/brand/brand.svg";
import SearchBar from "./components/search-bar";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { forwardRef, useState } from "react";
import { RootState } from "@/stores/store";
import userSlice from "@/stores/slices/user-slice";
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
import MenuModal from "./components/menu-modal";
import { toggleMenuDrawer } from "@/stores/slices/ui-slice";
import { ReactComponent as BurgerIcon } from "@assets/svg/burger.svg";
import { LocationModal, LocationSection, UserSection } from "./components";
import { ProfileModal } from "./components/profile-modal";

export const Header = forwardRef<HTMLDivElement, { className: string }>((props, ref) => {
  const firstName = useSelector((state: any) => state.user.firstName);
  const city = useSelector((state: any) => state.user.city);
  const dispatch = useDispatch();
  const isMenuDrawerOpen = useSelector((state: RootState) => state.ui.menuDrawer)
  const isSignedIn = firstName && city;
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const navigate = useNavigate()
  const smallScreenDevice = useMediaQuery("(max-width: 400px)");

  const localCartQuantity = useSelector(
    (state: RootState) => state.localCart.totalQuantity
  );

  const cartQuantity = useSelector(
    (state: RootState) => state.user.cartItemCount
  );

  const itemCount = isSignedIn ? cartQuantity : localCartQuantity;

  const handleLocationSubmit = (location: string) => {
    dispatch(userSlice.actions.setGuestLocation({ city: location }));
    setIsLocationModalOpen(false);
  };

  return (
    <div ref={ref} className={props.className}>
      <div className={`flex justify-between w-full text-white items-center px-2 py-[5px] sm:py-0 bg-theme-blue `}>
        <div className="flex items-center">
          <BurgerIcon className="block sm:hidden z-20" width={32} height={32} onClick={() => dispatch(toggleMenuDrawer(true))} />
          <Link to={"/"} className="max-w-[60%] mb-1 flex items-center min-w-[136px] sm:hidden">
            <Brand className="" />
          </Link>
          <Link to={"/"} className="hidden sm:block max-w-[256px]">
            <BrandLogo />
          </Link>
          <LocationSection
            city={city}
            isSignedIn={isSignedIn}
            onLocationClick={() => setIsLocationModalOpen(true)}
          />
        </div>
        <SearchBar className="hidden md:flex h-10 mx-[3%] md:flex-grow max-w-[50%] text-gray-700" />
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
        <SearchBar className={`md:hidden h-8 w-full mb-2 my-1 text-gray-700`} />
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