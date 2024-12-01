import { useRef } from "react";
import { Link } from "react-router-dom";

import { CustomModal } from "@/components/ui/modal/custom-modal";

type LocationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onLocationSubmit: (location: string) => void;
  city: string | null;
};

export const LocationModal = ({ isOpen, onClose, onLocationSubmit, city }: LocationModalProps) => {
  const locationInput = useRef<HTMLInputElement>(null);

  const handleLocation = () => {
    if (!locationInput.current?.value || locationInput.current.value.trim().length < 2) {
      return;
    }
    onLocationSubmit(locationInput.current.value);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      direction="center"
      transitionType="slide"
      transitionDuration={300}
      widthClass="w-[90%] md:w-[50%] lg:w-[30%]"
      heightClass="h-[72]"
      topClass="top-[35%]"
      leftClass="left-[5%] md:left-[25%] lg:left-[35%]"
      className="noScrollbar rounded-xl"
      ariaLabel="User Location Modal"
    >
      <div className="mx-auto my-6 flex w-4/5 flex-col text-center">
        <button className="absolute right-3 top-2" onClick={onClose}>
          X
        </button>
        <h2 className="mb-2 mt-4 text-xl font-[500]">Choose your location</h2>
        <Link to="/sign-in" className="my-1 rounded-lg bg-theme-orange py-[4px] font-[500]">
          Sign in to see your address
        </Link>
        <p className="my-2 text-center">or</p>
        <label className="mb-2 font-[500]">{city ? "Change your city" : "Enter your city"}</label>
        <input
          type="text"
          className="rounded-lg border-2 border-[#3a4791] py-1"
          ref={locationInput}
        />
        <button
          onClick={handleLocation}
          type="submit"
          className="mx-auto my-3 w-1/2 rounded-lg bg-theme-orange py-[4px] font-[500]"
        >
          Apply
        </button>
      </div>
    </CustomModal>
  );
};
