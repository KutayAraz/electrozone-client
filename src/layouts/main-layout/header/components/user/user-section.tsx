import { Link } from "react-router-dom";

import { Basket } from "@/components/ui/basket";
import { paths } from "@/config/paths";
import Arrow from "@assets/svgs/arrow.svg?react";
import UserIcon from "@assets/svgs/user.svg?react";

import { LoginLink } from "./login-link";

export interface UserSectionProps {
  firstName: string | null;
  isSignedIn: boolean;
  itemCount: number | undefined;
  smallScreenDevice: boolean;
  onProfileClick: () => void;
}

export const UserSection = ({
  firstName,
  isSignedIn,
  itemCount = 0,
  smallScreenDevice,
  onProfileClick,
}: UserSectionProps) => (
  <div className="flex items-center whitespace-nowrap xs:pr-2">
    {isSignedIn ? (
      <button onClick={onProfileClick} className="text-center">
        {firstName}
      </button>
    ) : (
      <LoginLink className="login-button">Login</LoginLink>
    )}
    <Arrow width={20} height={20} />
    <button onClick={onProfileClick}>
      <UserIcon width={32} height={32} />
    </button>
    <Link to={paths.cart.getHref()} className="ml-2 mt-auto flex">
      {!smallScreenDevice && <p className="self-center">Basket</p>}
      <Basket itemCount={itemCount} />
    </Link>
  </div>
);
