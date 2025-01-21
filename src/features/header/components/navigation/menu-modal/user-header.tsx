import { Link } from "react-router-dom";

import { UserHeaderProps } from "@/features/header/types";
import { ReactComponent as UserIcon } from "@assets/svgs/user.svg";

export const UserHeader = ({ firstName, isSignedIn }: UserHeaderProps) => (
  <Link
    to={isSignedIn ? "/my-account" : "/sign-in"}
    className="flex w-full items-center justify-between bg-theme-blue p-4 text-white shadow-md"
  >
    <span className={`${isSignedIn ? "text-2xl" : "text-xl"}`}>
      {isSignedIn && firstName ? `Hello, ${firstName}` : "Hello, Sign In"}
    </span>
    <UserIcon className="size-8" />
  </Link>
);
