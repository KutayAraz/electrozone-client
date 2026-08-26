import { Divider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { CustomModal } from "@/components/ui/custom-modal";
import { paths } from "@/config/paths";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { navigationLinks } from "@/layouts/main-layout/header/constants/navigation";
import CloseButton from "@assets/svgs/close-button.svg?react";
import ExitIcon from "@assets/svgs/exit.svg?react";

interface ProfileModalProps {
  isOpen: boolean;
  isSignedIn: boolean;
  onClose: () => void;
}

export const ProfileModal = ({ isOpen, onClose, isSignedIn }: ProfileModalProps) => {
  const { submitLogout } = useLogout();
  return (
    <CustomModal
      placement="right"
      className="flex w-[85%] flex-col overflow-hidden sm:w-[60%] md:w-[40%] lg:w-[30%]"
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="User Profile Modal"
    >
      <div className="flex shrink-0 items-center justify-between bg-theme-blue">
        <Link
          to={paths.app.root.getHref()}
          className="grow px-4 py-6 text-xl font-semibold text-white"
          onClick={onClose}
        >
          My Account
        </Link>

        <button
          className="mr-4 size-7 shrink-0 text-white"
          onClick={onClose}
          aria-label="Close modal"
        >
          <CloseButton width={32} height={32} />
        </button>
      </div>

      <div className="flex grow flex-col justify-between overflow-y-auto">
        <div className="flex flex-col bg-white text-lg">
          {navigationLinks.map(({ path, label }) => (
            <React.Fragment key={path}>
              <Divider />

              <Link to={path} className="p-4 hover:bg-gray-100">
                {label}
              </Link>
            </React.Fragment>
          ))}

          <Divider />
        </div>

        <Divider />

        {isSignedIn && (
          <button
            className="mt-4 p-4 text-lg hover:bg-gray-100"
            onClick={() => {
              submitLogout();
              onClose();
            }}
          >
            Logout <ExitIcon className="inline h-auto w-8" />
          </button>
        )}
      </div>
    </CustomModal>
  );
};
