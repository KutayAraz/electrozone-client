import { ReactComponent as BrandLogo } from "@assets/brand/brand-logo.svg";
import { ReactComponent as Brand } from "@assets/brand/brand.svg";
import SearchBar from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import BurgerMenu from "./BurgerMenu";
import { ReactComponent as UserIcon } from "@assets/svg/user.svg";
import { ReactComponent as LocationPin } from "@assets/svg/location.svg";
import { ReactComponent as Arrow } from "@assets/svg/arrow.svg";
import { Link } from "react-router-dom";
import { forwardRef, useRef, useState } from "react";
import ProfileModal from "./ProfileModal";
import BasketWithBadge from "../UI/BasketWithBadge";
import { RootState } from "@/setup/store";
import CustomizableModal from "../Modal/CustomizableModal";
import userSlice from "@/setup/slices/user-slice";
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";

const Header = forwardRef<HTMLDivElement, { className: string }>((props, ref) => {
  const firstName = useSelector((state: any) => state.user.firstName);
  const city = useSelector((state: any) => state.user.city);
  const dispatch = useDispatch();
  const isSignedIn = firstName && city;
  const locationInput = useRef<HTMLInputElement>(null);
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

  const handleLocation = () => {
    if (
      !locationInput.current ||
      locationInput.current.value.trim().length < 2
    ) {
      return;
    }
    dispatch(
      userSlice.actions.setGuestLocation({ city: locationInput.current?.value })
    );
    setIsLocationModalOpen(false);
  };

  return (
    <div ref={ref} className={props.className}>
      <div className={`flex justify-between w-full text-white items-center px-2 py-[5px] sm:py-0 bg-theme-blue `}>
        <div className="flex">
          <BurgerMenu className="block sm:hidden z-20"></BurgerMenu>
          <Link to={"/"} className="max-w-[60%] mb-1 flex items-center min-w-[136px] sm:hidden">
            <Brand className="" />
          </Link>
          <Link to={"/"} className="hidden sm:block max-w-[256px]">
            <BrandLogo />
          </Link>
          <div className="hidden sm:flex items-center px-6">
            <LocationPin
              width={28}
              height={28}
              className="mr-[4px] stroke-white"
            />
            {isSignedIn ? (
              <div className="text-left text-sm">
                <p>Delivering to:</p>
                <p>{city}</p>
              </div>
            ) : (
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="text-left"
              >
                {city ? (
                  <div>
                    <p>Delivering to:</p>
                    <p>{city}</p>
                  </div>
                ) : (
                  <div>
                    <p>Hello,</p>
                    <p>Select your location</p>
                  </div>
                )}
              </button>
            )}
          </div>
        </div>
        <SearchBar className="hidden md:flex h-10 mx-[3%] md:flex-grow max-w-[50%] text-gray-700" />
        <div className="flex items-center xs:pr-2 whitespace-nowrap">
          {isSignedIn ? (
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="text-center"
            >
              {firstName}
            </button>
          ) : (
            <button onClick={() => navigate("/sign-in")} className="pl-2 xs:pl-4">
              Sign in
            </button>
          )}
          <Arrow width={20} height={20} />
          <button onClick={() => setIsProfileModalOpen(true)}>
            <UserIcon width={32} height={32} />
          </button>
          <Link to={"/my-cart"} className="flex mt-auto ml-2">
            {!smallScreenDevice && <p className="self-center">Basket</p>}
            <BasketWithBadge itemCount={itemCount} />
          </Link>
        </div>
      </div>
      <div
        className={`px-2`}
      >
        <SearchBar
          className={`md:hidden h-8 w-full mb-2 my-1 text-gray-700`}
        />
      </div>
      <CustomizableModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        direction="center"
        transitionType="slide"
        transitionDuration={300}
        widthClass="w-[90%] md:w-[50%] lg:w-[30%]"
        heightClass="h-[72]"
        topClass="top-[35%]"
        leftClass="left-[5%] md:left-[25%] lg:left-[35%]"
        className="rounded-xl noScrollbar"
      >
        <div className="flex flex-col text-center mx-auto my-6 w-[80%]">
          <button
            className="absolute top-2 right-3"
            onClick={() => setIsLocationModalOpen(false)}
          >
            X
          </button>
          <h2 className="text-xl font-[500] mt-4 mb-2">Choose your location</h2>
          <Link
            to="/sign-in"
            className="bg-[#febd69] rounded-lg font-[500] py-[4px] my-1"
          >
            Sign in to see your address
          </Link>
          <p className="text-center my-2">or</p>
          <label className="font-[500] mb-2">
            {city ? "Change your city" : "Enter your city"}
          </label>
          <input
            type="text"
            className="border-2 rounded-lg border-[#3a4791] py-1"
            ref={locationInput}
          />
          <button
            onClick={handleLocation}
            type="submit"
            className="bg-[#febd69] rounded-lg w-[50%] mx-auto my-3 py-[4px] font-[500]"
          >
            Apply
          </button>
        </div>
      </CustomizableModal>

      <ProfileModal
        isOpen={isProfileModalOpen}
        isSignedIn={isSignedIn}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
});

export default Header;
