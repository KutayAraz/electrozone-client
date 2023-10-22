import { useSelector } from "react-redux";
import { ReactComponent as BurgerIcon } from "@assets/svg/burger.svg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootState } from "@/setup/store";
import { ReactComponent as ExitIcon } from "@assets/svg/exit.svg";
import CustomizableModal from "../Modal/CustomizableModal";
import { ReactComponent as CloseButton } from "@assets/svg/close-button.svg";
import { ReactComponent as UserIcon } from "@assets/svg/user.svg";
import { ReactComponent as Arrow } from "@assets/svg/arrow-black.svg";
import { ReactComponent as BackArrow } from "@assets/svg/go-back.svg";
import { Divider } from "@mui/material";

interface BurgerMenuProps {
  className: string;
  children?: React.ReactNode;
}

const BurgerMenu = ({ className, children }: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [activeView, setActiveView] = useState("main");
  const city = useSelector((state: RootState) => state.user.city);
  const firstName = useSelector((state: RootState) => state.user.firstName);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling

      // Prevent touch events
      const preventSwipe = (e: any) => e.preventDefault();
      document.addEventListener("touchmove", preventSwipe, { passive: false });

      // Clean up
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("touchmove", preventSwipe);
      };
    }
  }, [isOpen]);

  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  return (
    <div className="flex">
      <button
        className={`items-center ${className}`}
        onClick={() => {
          setActiveView("main"); // Set the activeView to "main"
          setIsOpen(true); // Open the modal
        }}
      >
        <BurgerIcon width={32} height={32} />
      </button>

      <CustomizableModal
        widthClass="w-[85%]"
        heightClass="h-screen"
        topClass="top-0"
        leftClass="left-0"
        direction="right"
        transitionType="slide"
        transitionDuration={300}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="noScrollbar overflow-y-hidden overflow-x-hidden"
      >
        <div className="bg-theme-blue p-4 shadow-md text-white w-full flex items-center">
          {isSignedIn ? (
            <Link to={"/my-account"} className="text-3xl flex-grow">
              Hello, {firstName}
            </Link>
          ) : (
            <Link to={"/sign-in"} className="text-3xl flex-grow">
              Hello, Sign In
            </Link>
          )}

          <UserIcon className="h-8 w-auto ml-auto" />
        </div>
        <div className="flex flex-col text-gray-700 justify-between relative">
          <div
            className={`transition-transform duration-300 p-4 space-y-4 ease-in-out ${
              activeView !== "main" ? "-translate-x-full" : ""
            }`}
          >
            <div className="flex flex-col space-y-4">
              <h4 className="text-2xl font-semibold">Trending</h4>
              <Divider />
              <Link
                to={"/trending/best-sellers"}
                className="text-xl hover:bg-gray-100"
              >
                Best Sellers
              </Link>
              <Link
                to={"/category/most-wishlisted"}
                className="text-xl hover:bg-gray-100"
              >
                Most Wishlisted
              </Link>
              <Link
                to={"/category/best-rated"}
                className="text-xl hover:bg-gray-100"
              >
                Best Rated
              </Link>
            </div>
            <Divider />
            <div>
              <Link to={"/category"} className="text-2xl font-semibold">
                Shop By Department
              </Link>
            </div>
            <Divider />
            <button
              onClick={() => setActiveView("tvsAndSoundbars")}
              className="hover:bg-gray-100 w-full text-left flex"
            >
              <h4 className="text-xl">TVs & Soundbars</h4>
              <Arrow className="h-4 w-auto ml-auto fill-white my-auto" />
            </button>
            <button
              onClick={() => setActiveView("pcAndLaptops")}
              className="hover:bg-gray-100 w-full text-left flex"
            >
              <h4 className="text-xl">Computers & Accessories</h4>
              <Arrow className="h-4 w-auto ml-auto fill-white my-auto" />
            </button>
            <button
              onClick={() => setActiveView("smartphonesAndAccessories")}
              className="hover:bg-gray-100 w-full text-left flex"
            >
              <h4 className="text-xl">Smartphones & Accessories</h4>
              <Arrow className="h-4 w-auto ml-auto fill-white my-auto" />
            </button>
            <button
              onClick={() => setActiveView("printersAndInk")}
              className="hover:bg-gray-100 w-full text-left flex"
            >
              <h4 className="text-xl">Printers & Ink</h4>
              <Arrow className="h-4 w-auto ml-auto fill-white my-auto" />
            </button>
            <Divider />
            <div className="flex flex-col space-y-4">
              <h4 className="text-2xl font-semibold">Help & Settings</h4>
              <Divider />
              {isSignedIn && (
                <Link to={"/my-account"} className="text-xl hover:bg-gray-100">
                  Your Account
                </Link>
              )}
              {city && <p className="text-xl">Delivery Location: {city}</p>}
              <Link to={"/contact"} className="text-xl hover:bg-gray-100">
                Contact
              </Link>

              <div className="text-xl">
                {isSignedIn ? (
                  <Link to={"/sign-out"} className="hover:bg-gray-100">
                    Sign Out <ExitIcon className="w-6 h-6 mr-4 inline" />
                  </Link>
                ) : (
                  <Link to={"/sign-in"} className="hover:bg-gray-100">
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div
            className={`absolute top-0 transition-transform duration-300 ease-in-out w-full h-full p-4 space-y-4 flex flex-col ${
              activeView !== "tvsAndSoundbars"
                ? "translate-x-full overflow-hidden "
                : ""
            }`}
          >
            <button
              onClick={() => setActiveView("main")}
              className="flex items-center mr-auto text-2xl hover:bg-gray-100 w-full"
            >
              <BackArrow className="h-6 w-auto inline my-auto" />
              Main Menu
            </button>
            <Divider />
            <Link
              to={"/category/tvs-and-soundbars/tvs"}
              className="text-xl hover:bg-gray-100"
            >
              TVs
            </Link>
            <Link
              to={"/category/tvs-and-soundbars/soundbars"}
              className="text-xl hover:bg-gray-100"
            >
              Soundbars
            </Link>
          </div>

          <div
            className={`absolute top-0 transition-transform duration-300 ease-in-out w-full h-full flex flex-col p-4 space-y-4  ${
              activeView !== "pcAndLaptops"
                ? "translate-x-full overflow-hidden "
                : ""
            }`}
          >
            <button
              onClick={() => setActiveView("main")}
              className="flex items-center mr-auto text-2xl hover:bg-gray-100 w-full"
            >
              <BackArrow className="h-6 w-auto inline my-auto" />
              Main Menu
            </button>
            <Divider />
            <Link
              to={"/category/computers-and-accessories/computers"}
              className="text-xl hover:bg-gray-100"
            >
              PCs
            </Link>
            <Link
              to={"/category/computers-and-accessories/laptops"}
              className="text-xl hover:bg-gray-100"
            >
              Laptops
            </Link>
            <Link
              to={"/category/computers-and-accessories/monitors"}
              className="text-xl hover:bg-gray-100"
            >
              Monitors
            </Link>
          </div>

          <div
            className={`absolute top-0 transition-transform duration-300 ease-in-out w-full h-full flex flex-col p-4 space-y-4 ${
              activeView !== "smartphonesAndAccessories"
                ? "translate-x-full overflow-hidden "
                : ""
            }`}
          >
            <button
              onClick={() => setActiveView("main")}
              className="flex items-center mr-auto text-2xl hover:bg-gray-100 w-full"
            >
              <BackArrow className="h-6 w-auto inline my-auto" />
              Main Menu
            </button>
            <Divider />
            <Link
              to={"/category/smartphones-and-accessories/smartphones"}
              className="text-xl hover:bg-gray-100"
            >
              Smartphones
            </Link>
            <Link
              to={
                "/category/smartphones-and-accessories/smartphone-accessories"
              }
              className="text-xl hover:bg-gray-100"
            >
              Smartphone Accessories
            </Link>
          </div>

          <div
            className={`absolute top-0 transition-transform duration-300 ease-in-out w-full h-full flex flex-col p-4 space-y-4 ${
              activeView !== "printersAndInk"
                ? "translate-x-full overflow-hidden "
                : ""
            }`}
          >
            <button
              onClick={() => setActiveView("main")}
              className="flex items-center mr-auto text-2xl hover:bg-gray-100 w-full"
            >
              <BackArrow className="h-6 w-auto inline my-auto" />
              Main Menu
            </button>
            <Divider />
            <Link
              to={"/category/printers-and-ink/laser-printers"}
              className="text-xl hover:bg-gray-100"
            >
              Laser Printers
            </Link>
            <Link
              to={"/category/printers-and-ink/inkjet-printers"}
              className="text-xl hover:bg-gray-100"
            >
              Inkjet Printers
            </Link>
            <Link
              to={"/category/printers-and-ink/ink"}
              className="text-xl hover:bg-gray-100"
            >
              Ink
            </Link>
          </div>
        </div>
      </CustomizableModal>
      {isOpen && (
        <button
          className="absolute top-4 left-[calc(80%+40px)] w-7 h-7 z-[40]"
          onClick={() => setIsOpen(false)}
        >
          <CloseButton width={32} height={32} className="text-red-500"/>

        </button>
      )}
    </div>
  );
};

export default BurgerMenu;
