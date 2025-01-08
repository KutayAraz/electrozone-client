import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { CustomModal } from "@/components/ui/modal/custom-modal";
import { userSlice } from "@/stores/slices/user-slice";
import { RootState } from "@/stores/store";
import { ReactComponent as CloseButton } from "@assets/svgs/close-button.svg";
import { ReactComponent as LocationIcon } from "@assets/svgs/location.svg";

export const UserLocation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const locationInput = useRef<HTMLInputElement>(null);
  const userLocation = useSelector((state: RootState) => state.user.city);
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);

  const handleLocation = () => {
    if (!locationInput.current || locationInput.current.value.trim().length < 2) {
      return;
    }
    dispatch(userSlice.actions.setGuestLocation({ city: locationInput.current?.value }));
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#3a4791] py-[5px] sm:hidden">
      {isSignedIn ? (
        <label htmlFor="userLocation" className="flex w-full pl-[10px] text-white">
          Currently delivering to {userLocation}
        </label>
      ) : (
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="flex w-full pl-[10px] text-white"
        >
          <LocationIcon className="size-6 stroke-white" />
          Select your location
        </button>
      )}

      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        widthClass="w-full"
        direction="bottom"
        heightClass="auto"
        bottomClass="bottom-0"
        leftClass="left-0"
        transitionType="slide"
        transitionDuration={300}
        ariaLabel="User Location Modal"
      >
        <CloseButton
          className="absolute right-4 top-4 size-6 cursor-pointer stroke-gray-500"
          onClick={() => setIsModalOpen(false)}
        />
        <div className="mx-auto my-6 flex w-4/5 flex-col text-center">
          <h2 className="mb-2 mt-4 text-xl font-medium">Choose your location</h2>
          <Link to="/sign-in" className="my-1 rounded-lg bg-theme-orange py-2 font-medium">
            Sign in to see your address
          </Link>
          <p className="my-2 text-center">or</p>
          <label className="mb-1 text-xl font-medium">
            {userLocation ? "Change your city" : "Enter your city"}
          </label>
          <input
            type="text"
            className="rounded-lg border-2 border-[#3a4791] py-1"
            ref={locationInput}
          />
          <button
            onClick={handleLocation}
            type="submit"
            className="mx-auto my-3 w-1/2 rounded-lg bg-theme-orange py-2 font-medium"
          >
            Apply
          </button>
        </div>
      </CustomModal>
    </div>
  );
};
