import { Link } from "react-router-dom";

import { paths } from "@/config/paths";
import UserIcon from "@assets/svgs/user.svg?react";

interface UserHeaderProps {
  firstName: string | null;
  isSignedIn: boolean;
}

export const UserHeader = ({ firstName, isSignedIn }: UserHeaderProps) => (
  <Link
    to={isSignedIn ? paths.app.root.getHref() : paths.auth.login.getHref()}
    className="flex w-full items-center justify-between bg-theme-blue p-4 text-white shadow-md"
  >
    <span className={`${isSignedIn ? "text-2xl" : "text-xl"}`}>
      {isSignedIn && firstName ? `Hello, ${firstName}` : "Hello, Sign In"}
    </span>
    <UserIcon className="size-8" />
  </Link>
);
