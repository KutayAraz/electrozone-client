import { ReactComponent as BrandLogo } from "@assets/brand/brand-logo.svg";
import { ReactComponent as Brand } from "@assets/brand/brand.svg";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import BurgerMenu from "./BurgerMenu";
import { ReactComponent as Basket } from "@assets/svg/basket.svg";
import { ReactComponent as UserIcon } from "@assets/svg/user.svg";
import { ReactComponent as LocationPin } from "@assets/svg/location-pin.svg";
import { ReactComponent as Arrow } from "@assets/svg/arrow.svg";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "@/setup/store";

const Header = () => {
  const firstName = useSelector(
    (state: RootState) => state.user.user.firstName
  );
  const city = useSelector((state: RootState) => state.user.user.city);
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);

  return (
    <div className="bg-[#13193F]">
      <div className="flex justify-between w-full bg text-white items-center">
        <div className="flex">
          <BurgerMenu className="block xs:hidden"></BurgerMenu>
          <Link to={"/"}>
            <Brand className="block xs:hidden" />
          </Link>
          <Link to={"/"}>
            <BrandLogo className="hidden xs:block " />
          </Link>
          <div className="hidden md:flex items-center px-6">
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
        <SearchBar className="hidden xs:block text-black border-2 h-10 w-[40%]" />
        <div className="flex items-center xs:pr-2 whitespace-nowrap">
          {isSignedIn ? (
            <div className="text-center">
              <p>{firstName}</p>
              <Link to="/sign-out">Sign Out</Link>
            </div>
          ) : (
            <Link to="/sign-in" className="pl-4">
              Sign in
            </Link>
          )}
          <Arrow width={20} height={20} />
          <Link to={"/your-profile"}>
            <UserIcon width={32} height={32} />
          </Link>

          <Basket width={40} height={40} className="ml-2" />
        </div>
      </div>
      <div className="px-1">
        <SearchBar className="xs:hidden text-black border-2 w-full " />
      </div>
    </div>
  );
};

export default Header;
