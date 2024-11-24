import { Link } from "react-router-dom";
import { ReactComponent as UserIcon } from "@assets/svg/user.svg";
import { ReactComponent as Arrow } from "@assets/svg/arrow.svg";
import { Basket } from "@/components/ui/basket";

type UserSectionProps = {
    firstName: string | null;
    isSignedIn: boolean;
    itemCount: number | null;
    smallScreenDevice: boolean;
    onProfileClick: () => void;
    onSignInClick: () => void;
}

export const UserSection = ({
    firstName,
    isSignedIn,
    itemCount,
    smallScreenDevice,
    onProfileClick,
    onSignInClick
}: UserSectionProps) => (
    <div className="flex items-center xs:pr-2 whitespace-nowrap">
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
        <Link to="/my-cart" className="flex mt-auto ml-2">
            {!smallScreenDevice && <p className="self-center">Basket</p>}
            <Basket itemCount={itemCount} />
        </Link>
    </div>
);