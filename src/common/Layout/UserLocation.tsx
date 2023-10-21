import { ReactComponent as LocationIcon } from "@assets/svg/location-pin2.svg";
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

  const handleLocation = () => {
    if (!locationInput.current || locationInput.current.value.trim().length < 2) {
      return;
    }
    dispatch(
      userSlice.actions.setGuestLocation({ city: locationInput.current?.value })
    );
    setIsModalOpen(false);
  };

  return (
    <div className="xs:hidden bg-[#3a4791] py-[5px]">
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-white ml-[2.5%] flex"
      >
        <LocationIcon className="w-4 h-4 stroke-white my-auto mr-1" />
        {userLocation
          ? `Currently delivering to ${userLocation}`
          : "Select your location"}
      </button>
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
          className="absolute top-4 right-4 bg-transparent w-6 h-6"
          onClick={() => setIsModalOpen(false)}
        >
          close
        </CloseButton>
        <div className="flex flex-col text-center mx-auto my-6 w-[80%]">
          <h2 className="text-xl font-[500] mt-4 mb-2">
            Choose your location
          </h2>
          <Link
            to="/sign-in"
            className="bg-[#febd69] rounded-lg font-[500] py-[4px] my-1"
          >
            Sign in to see your address
          </Link>
          <p className="text-center my-2">or</p>
          <label className="font-[500] mb-2">
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
            className="bg-[#febd69] rounded-lg w-[50%] mx-auto my-3 py-[4px] font-[500]"
          >
            Apply
          </button>
        </div>
      </CustomizableModal>
    </div>
  );
};

export default UserLocation;
