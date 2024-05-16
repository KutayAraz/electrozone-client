import { ReactComponent as LocationIcon } from "@assets/svg/location.svg";
import { useRef, useState } from "react";
import CustomizableModal from "../Modal/CustomizableModal";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "@/setup/slices/user-slice";
import { RootState } from "@/setup/store";
import { ReactComponent as CloseButton } from "@assets/svg/close-button.svg";

const UserLocation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const locationInput = useRef<HTMLInputElement>(null);
  const userLocation = useSelector((state: RootState) => state.user.city);
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);

  const handleLocation = () => {
    if (
      !locationInput.current ||
      locationInput.current.value.trim().length < 2
    ) {
      return;
    }
    dispatch(
      userSlice.actions.setGuestLocation({ city: locationInput.current?.value })
    );
    setIsModalOpen(false);
  };

  return (
    <div className="sm:hidden bg-[#3a4791] py-[5px]">
      {isSignedIn ? (
        <label
          htmlFor="userLocation"
          className="text-white pl-[10px] flex w-full"
        >
          Currently delivering to {userLocation}
        </label>
      ) : (
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-white pl-[10px] flex w-full"
        >
          <LocationIcon className="w-6 h-6 stroke-white" />
          Select your location
        </button>
      )}

      <CustomizableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        widthClass="w-full"
        direction="bottom"
        heightClass="auto"
        bottomClass="bottom-0"
        leftClass="left-0"
        transitionType="slide"
        transitionDuration={300}
      >
        <CloseButton
          className="absolute top-4 right-4 cursor-pointer w-6 h-6 stroke-gray-500"
          onClick={() => setIsModalOpen(false)}
        />
        <div className="flex flex-col text-center mx-auto my-6 w-[80%]">
          <h2 className="text-xl font-[500] mt-4 mb-2">Choose your location</h2>
          <Link
            to="/sign-in"
            className="bg-[#febd69] rounded-lg font-[500] py-2 my-1"
          >
            Sign in to see your address
          </Link>
          <p className="text-center my-2">or</p>
          <label className="font-[500] mb-1 text-xl">
            {userLocation ? "Change your city" : "Enter your city"}
          </label>
          <input
            type="text"
            className="border-2 rounded-lg border-[#3a4791] py-1"
            ref={locationInput}
          />
          <button
            onClick={handleLocation}
            type="submit"
            className="bg-[#febd69] rounded-lg w-[50%] mx-auto my-3 py-2 font-[500]"
          >
            Apply
          </button>
        </div>
      </CustomizableModal>
    </div>
  );
};

export default UserLocation;
