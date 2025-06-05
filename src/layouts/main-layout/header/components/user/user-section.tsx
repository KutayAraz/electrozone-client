import { Link } from "react-router-dom";

import { Basket } from "@/components/ui/basket";
import Arrow from "@assets/svgs/arrow.svg?react";
import UserIcon from "@assets/svgs/user.svg?react";

export interface UserSectionProps {
  firstName: string | null;
  isSignedIn: boolean;
  itemCount: number;
  smallScreenDevice: boolean;
  onProfileClick: () => void;
  onSignInClick: () => void;
}

export const UserSection = ({
  firstName,
  isSignedIn,
  itemCount = 0,
  smallScreenDevice,
  onProfileClick,
  onSignInClick,
}: UserSectionProps) => (
  <div className="flex items-center whitespace-nowrap xs:pr-2">
    {isSignedIn ? (
      <button onClick={onProfileClick} className="text-center">
        {firstName}
      </button>
    ) : (
      <button onClick={onSignInClick} className="pl-2 xs:pl-4">
        Sign in
      </button>
    )}
    <Arrow width={20} height={20} />
    <button onClick={onProfileClick}>
      <UserIcon width={32} height={32} />
    </button>
    <Link to="/cart" className="ml-2 mt-auto flex">
      {!smallScreenDevice && <p className="self-center">Basket</p>}
      <Basket itemCount={itemCount} />
    </Link>
  </div>
);
