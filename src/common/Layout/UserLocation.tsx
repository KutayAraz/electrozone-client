import { ReactComponent as LocationIcon } from "@assets/svg/location-pin2.svg";
import { useState } from "react";

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
    </div>
  );
};

export default UserLocation;
