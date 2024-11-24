import { Link } from "react-router-dom";
import { ReactComponent as CloseButton } from "@assets/svg/close-button.svg";
import { Divider } from "@mui/material";
import { ReactComponent as ExitIcon } from "@assets/svg/exit.svg";
import { CustomModal } from "@/components/ui/modal";

type ProfileModalProps = {
  isOpen: boolean;
  isSignedIn: boolean;
  onClose: () => void;
}

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
      >
        <div className="flex flex-col h-full justify-between">
          <div className="bg-white">
            <Link
              to="/my-account"
              className="text-xl font-semibold  text-white bg-theme-blue py-6 px-4 block"
              onClick={() => onClose()}
            >
              My Account
            </Link>
            <div className="flex flex-col space-y-4 text-lg bg-white">
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
              <div className="text-lg px-4 pb-4 mt-4">
                Sign Out <ExitIcon className="w-[2rem] h-auto inline" />
              </div>
            )}
          </Link>
        </div>
      </CustomModal>
      {isOpen && (
        <button
          className="absolute top-6 right-[calc(80%+40px)] sm:right-[calc(60%+30px)] md:right-[calc(40%+30px)] lg:right-[calc(30%+30px)] w-7 h-7 z-[35]"
          onClick={() => onClose()}
        >
          <CloseButton width={32} height={32} />
        </button>
      )}
    </>
  );
};
