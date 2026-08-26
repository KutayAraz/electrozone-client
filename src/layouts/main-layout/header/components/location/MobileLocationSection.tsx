import { useSelector } from "react-redux";

import { RootState } from "@/stores/store";
import LocationIcon from "@assets/svgs/location.svg?react";

interface MobileLocationSectionProps {
  onLocationClick: () => void;
}

export const MobileLocationSection = ({ onLocationClick }: MobileLocationSectionProps) => {
  const userLocation = useSelector((state: RootState) => state.user.city);
  const isSignedIn = useSelector((state: RootState) => state.user.isAuthenticated);

  return (
    <div className="bg-[#3a4791] py-[5px] sm:hidden">
      {isSignedIn ? (
        <label htmlFor="userLocation" className="flex w-full pl-[10px] text-white">
          Currently delivering to {userLocation}
        </label>
      ) : (
        <button onClick={onLocationClick} className="flex w-full pl-[10px] text-white">
          <LocationIcon className="size-6 stroke-white" />
          Select your location
        </button>
      )}
    </div>
  );
};
