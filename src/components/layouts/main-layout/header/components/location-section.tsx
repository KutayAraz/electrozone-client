import { ReactComponent as LocationPin } from "@assets/svgs/location.svg";

type LocationSectionProps = {
  city: string | null;
  isSignedIn: boolean;
  onLocationClick: () => void;
};

const CityDisplay = ({ city }: { city: string }) => (
  <div className="text-left text-sm">
    <p>Delivering to:</p>
    <p>{city}</p>
  </div>
);
CityDisplay.displayName = "CityDisplay";

export const LocationSection = ({ city, isSignedIn, onLocationClick }: LocationSectionProps) => (
  <div className="hidden items-center px-6 sm:flex">
    <LocationPin width={28} height={28} className="mr-1 stroke-white" />
    {isSignedIn && city ? (
      <CityDisplay city={city} />
    ) : (
      <button onClick={onLocationClick} className="text-left">
        {city ? (
          <CityDisplay city={city} />
        ) : (
          <div className="text-sm">
            <p>Hello,</p>
            <p>Select your location</p>
          </div>
        )}
      </button>
    )}
  </div>
);
