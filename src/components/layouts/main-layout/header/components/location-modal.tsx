import { CustomModal } from "@/components/ui/modal/custom-modal";
import { useRef } from "react";
import { Link } from "react-router-dom";

type LocationModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onLocationSubmit: (location: string) => void;
    city: string | null;
}

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
            className="rounded-xl noScrollbar"
        >
            <div className="flex flex-col text-center mx-auto my-6 w-[80%]">
                <button
                    className="absolute top-2 right-3"
                    onClick={onClose}
                >
                    X
                </button>
                <h2 className="text-xl font-[500] mt-4 mb-2">Choose your location</h2>
                <Link
                    to="/sign-in"
                    className="bg-[#febd69] rounded-lg font-[500] py-[4px] my-1"
                >
                    Sign in to see your address
                </Link>
                <p className="text-center my-2">or</p>
                <label className="font-[500] mb-2">
                    {city ? "Change your city" : "Enter your city"}
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
        </CustomModal>
    );
};