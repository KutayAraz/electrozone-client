import { ReactComponent as BrandLogo } from "@assets/brand/brand-logo.svg";
import { ReactComponent as Brand } from "@assets/brand/brand.svg";
import SearchBar from "./SearchBar";
import { useSelector } from "react-redux";
import BurgerMenu from "./BurgerMenu";
import { ReactComponent as Basket } from "@assets/svg/basket.svg";
import { ReactComponent as UserIcon } from "@assets/svg/user.svg";
import { ReactComponent as LocationPin } from "@assets/svg/location-pin.svg";
import { ReactComponent as Arrow } from "@assets/svg/arrow.svg";

interface State {
  user: {
    isSignedIn: boolean;
    username: string;
  };
}

const Header = () => {
  const isSignedIn = useSelector<State, boolean>(
    (state) => state.user.isSignedIn
  );
  const username = useSelector<State, boolean>(
    (state) => state.user.isSignedIn
  );
  return (
    <div className="bg-[#13193F]">
      <div className="flex justify-between w-full bg text-white items-center">
        <div className="flex">
          <BurgerMenu className="block xs:hidden"></BurgerMenu>
          <Brand className="block xs:hidden" />
          <BrandLogo className="hidden xs:block " />
          <div className="hidden xs:flex items-center px-6">
            <div className="flex-col whitespace-nowrap pr-2">
              <p>Deliver To</p>
              <p>California</p>
            </div>
            <LocationPin width={28} height={28} />
          </div>
        </div>        
        <SearchBar className="hidden xs:block text-black border-2 h-10 w-[50%]" />
        <div className="flex items-center xs:pr-2 whitespace-nowrap">
          {isSignedIn ? <p>{username}</p> : <p className="pl-4">Sign in</p>}
          <Arrow width={20} height={20} />
          <UserIcon width={32} height={32} />
          <Basket width={40} height={40} className="ml-2"/>
        </div>
      </div>
      <div className="px-1">
        <SearchBar className="xs:hidden text-black border-2 w-full " />
      </div>
    </div>
  );
};

export default Header;
