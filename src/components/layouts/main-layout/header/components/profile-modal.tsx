import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

import { CustomModal } from "@/components/ui/modal/custom-modal";
import { ReactComponent as CloseButton } from "@assets/svgs/close-button.svg";
import { ReactComponent as ExitIcon } from "@assets/svgs/exit.svg";

type ProfileModalProps = {
  isOpen: boolean;
  isSignedIn: boolean;
  onClose: () => void;
};

export const ProfileModal = ({ isOpen, onClose, isSignedIn }: ProfileModalProps) => {
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
        onClose={() => onClose()}
        ariaLabel="User Profile Modal"
      >
        <div className="flex h-full flex-col justify-between">
          <div className="bg-white">
            <Link
              to="/my-account"
              className="block bg-theme-blue  px-4 py-6 text-xl font-semibold text-white"
              onClick={() => onClose()}
            >
              My Account
            </Link>
            <div className="flex flex-col space-y-4 bg-white text-lg">
              <Divider />
              <Link to="/my-account/orders" className="px-4">
                Previous Orders
              </Link>
              <Divider />
              <Link to="/my-account/profile" className="px-4">
                Manage Profile
              </Link>
              <Divider />
              <Link to="/my-account/update-password" className="px-4">
                Account Security
              </Link>
              <Divider />
              <Link to="/my-account/wishlist" className="px-4">
                Wishlist
              </Link>
              <Divider />
              <Link to="/contact-us" className="px-4">
                Contact Us
              </Link>
              <Divider />
            </div>
          </div>

          <Link to="/sign-out">
            <Divider />
            {isSignedIn && (
              <div className="mt-4 px-4 pb-4 text-lg">
                Sign Out <ExitIcon className="inline h-auto w-8" />
              </div>
            )}
          </Link>
        </div>
      </CustomModal>
      {isOpen && (
        <button
          className="absolute right-[calc(80%+40px)] top-6 z-[35] size-7 sm:right-[calc(60%+30px)] md:right-[calc(40%+30px)] lg:right-[calc(30%+30px)]"
          onClick={() => onClose()}
        >
          <CloseButton width={32} height={32} />
        </button>
      )}
    </>
  );
};
