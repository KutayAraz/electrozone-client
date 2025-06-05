import { Divider } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import { CustomModal } from "@/components/ui/custom-modal";
import { useLogout } from "@/features/auth/hooks/use-logout";
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
    <>
      <CustomModal
        heightClass="h-screen"
        widthClass="w-[85%] sm:w-[60%] md:w-[40%] lg:w-[30%]"
        rightClass="right-0"
        topClass="top-0"
        transitionType="slide"
        direction="left"
        isOpen={isOpen}
        onClose={onClose}
        ariaLabel="User Profile Modal"
      >
        <div className="flex h-full flex-col justify-between">
          <div className="bg-white">
            <Link
              to="/my-account"
              className="block bg-theme-blue px-4 py-6 text-xl font-semibold text-white"
              onClick={onClose}
            >
              My Account
            </Link>
            <div className="flex flex-col bg-white text-lg ">
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
          </div>

          <Divider />
          {isSignedIn && (
            <button className="mt-4 p-4 text-lg hover:bg-gray-100" onClick={submitLogout}>
              Logout <ExitIcon className="inline h-auto w-8" />
            </button>
          )}
        </div>
      </CustomModal>
      {isOpen && (
        <button
          className="absolute right-[calc(80%+40px)] top-6 z-[35] size-7 sm:right-[calc(60%+30px)] md:right-[calc(40%+30px)] lg:right-[calc(30%+30px)]"
          onClick={onClose}
        >
          <CloseButton width={32} height={32} />
        </button>
      )}
    </>
  );
};
