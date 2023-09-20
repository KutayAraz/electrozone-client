import { ReactComponent as LocationIcon } from "@assets/svg/location-pin2.svg";
import { useState } from "react";
import CustomizableModal from "../Modal/CustomizableModal";

const UserLocation = ({ location }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="xs:hidden bg-[#3a4791] py-1">
      <button
        onClick={() => setIsModalOpen(true)}
        className="text-white ml-[3%] flex"
      >
        <LocationIcon className="w-4 h-4 stroke-white my-auto mr-1" />
        {location
          ? `Currently delivering to ${location}`
          : "Select your location"}
      </button>
      <CustomizableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        width="100vw"
        direction="bottom"
        height="30%"
        bottom="0"
        left="0"
        transitionType="slide"
      >
        <div className="flex flex-col">
          <label>Enter your city</label>
          <input type="text" className="border-2" />
          <button onClick={() => setIsModalOpen(false)}>close</button>
        </div>
      </CustomizableModal>
    </div>
  );
};

export default UserLocation;
