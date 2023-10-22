import { Link } from "react-router-dom";
import CustomizableModal from "../Modal/CustomizableModal";
import { ReactComponent as CloseButton } from "@assets/svg/close-button.svg";
import { Divider } from "@mui/material";
import { ReactComponent as ExitIcon } from "@assets/svg/exit.svg";

export interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
  return (
    <>
      <CustomizableModal
        heightClass="h-screen"
        widthClass="w-[85%]"
        rightClass="right-0"
        topClass="top-0"
        transitionType="slide"
        direction="left"
        isOpen={isOpen}
        onClose={() => onClose()}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="bg-[#13193F]">
            <Link
              to="/my-account"
              className="text-2xl font-semibold py-4 text-white pt-8 px-4 block"
              onClick={() => onClose()}
            >
              My Account
            </Link>
            <div className="flex flex-col space-y-4 mt-4 text-xl bg-white">
              <Divider />
              <Link to="/my-account/orders" className="px-4">Previous Orders</Link>
              <Divider />
              <Link to="/my-account/profile" className="px-4">Manage Address</Link>
              <Divider />
              <Link to="/my-account/update-password" className="px-4">Account Security</Link>
              <Divider />
              <Link to="/my-account/wishlist" className="px-4">Wishlist</Link>
              <Divider />
              <Link to="/contact-us" className="px-4">Contact Us</Link>
              <Divider />
            </div>
          </div>

          <Link to="/sign-out">
            <Divider />
            <div className="text-xl px-4 pb-4 mt-4">
              Sign Out <ExitIcon className="w-[2rem] h-auto inline" />
            </div>
          </Link>
        </div>
      </CustomizableModal>
      {isOpen && (
        <button
          className="absolute top-6 right-[calc(80%+40px)] w-7 h-7 z-[35]"
          onClick={() => onClose()}
        >
          <CloseButton width={32} height={32} />
        </button>
      )}
    </>
  );
};

export default ProfileModal;
