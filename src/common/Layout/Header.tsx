import { ReactComponent as BrandLogo } from "@assets/brand/brand-logo.svg";
import { ReactComponent as Brand } from "@assets/brand/brand.svg";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import BurgerMenu from "./BurgerMenu";
import { ReactComponent as Basket } from "@assets/svg/basket.svg";
import { ReactComponent as UserIcon } from "@assets/svg/user.svg";
import { ReactComponent as LocationPin } from "@assets/svg/location-pin.svg";
import { ReactComponent as Arrow } from "@assets/svg/arrow.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProfileModal from "./ProfileModal";
import BasketWithBadge from "../UI/BasketWithBadge";
import { RootState } from "@/setup/store";

const Header = () => {
  const firstName = useSelector((state: any) => state.user.firstName);
  const city = useSelector((state: any) => state.user.city);
  const isSignedIn = firstName && city;

  const itemCount = isSignedIn
    ? null
    : useSelector((state: RootState) => state.localCart.totalQuantity);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between w-full text-white items-center ">
        <div className="flex">
          <BurgerMenu className="block sm:hidden"></BurgerMenu>
          <Link to={"/"} className="max-w-[80%] mb-1">
            <Brand className="block sm:hidden" />
          </Link>
          <Link to={"/"}>
            <BrandLogo className="hidden sm:block " />
          </Link>
          <div className="hidden sm:flex items-center px-6">
            <div className="flex-col whitespace-nowrap pr-2">
              {isSignedIn ? (
                <div className="text-center">
                  <p>Deliver To</p>
                  <p>{city}</p>
                </div>
              ) : (
                <div className="text-center">
                  <p>Hello, </p>
                  <p>Select your location</p>
                </div>
              )}
            </div>
            <LocationPin width={28} height={28} />
          </div>
        </div>
        <SearchBar className="hidden md:flex text-black h-10 mx-[3%] md:flex-grow" />
        <div className="flex items-center xs:pr-2 whitespace-nowrap">
          {isSignedIn ? (
            <button
              onClick={() => setIsProfileModalOpen(true)}
              className="text-center"
            >
              {firstName}
            </button>
          ) : (
            <Link to="/sign-in" className="pl-4">
              Sign in
            </Link>
          )}
          <Arrow width={20} height={20} />
          <button onClick={() => setIsProfileModalOpen(true)}>
            <UserIcon width={32} height={32} />
          </button>
          <Link to={"/my-cart"}>
            <BasketWithBadge itemCount={itemCount} />
          </Link>
        </div>
      </div>
      <div className="px-1">
        <SearchBar className="md:hidden text-black h-10 w-full my-1" />
      </div>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
};

export default Header;
