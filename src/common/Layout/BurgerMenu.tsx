import { useSelector } from "react-redux";
import { ReactComponent as BurgerIcon } from "@assets/svg/burger.svg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflowX = "hidden"; // Prevent x-axis scrolling
  
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);
  

  const scrollContainerRef = useRef<HTMLDivElement>(null); // Create a ref

  useEffect(() => {
    // When activeView changes, scroll to the top of the container
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [activeView]);

  return (
    <div className="flex">
      <button
        className={`items-center border border-transparent hover:border-1 hover:border-white rounded ${className}`}
        onClick={() => {
          setActiveView("main"); // Set the activeView to "main"
          setIsOpen(true); // Open the modal
        }}
      >
        <BurgerIcon width={32} height={32} />
        <p className="hidden sm:flex my-auto px-2">All</p>
      </button>

      <CustomizableModal
        widthClass="w-[85%] sm:w-[60%] md:w-[40%] lg:w-[30%]"
        heightClass={`${activeView === "main" ? "h-full" : "h-auto"}`}
        topClass="top-0"
        leftClass="left-0"
        direction="right"
        transitionType="slide"
        transitionDuration={300}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="overflow-x-hidden"
      >
        <div className="bg-theme-blue shadow-md text-white w-full flex items-center justify-between ">
          {isSignedIn ? (
            <Link
              to={"/my-account"}
              className="flex items-center justify-between w-full p-4"
            >
              <span className="text-3xl">Hello, {firstName}</span>
              <UserIcon className="h-8 w-auto" />
            </Link>
          ) : (
            <Link
              to={"/sign-in"}
              className="flex items-center justify-between w-full p-4"
            >
              <span className="text-3xl">Hello, Sign In</span>
              <UserIcon className="h-8 w-auto" />
            </Link>
          )}
        </div>

        <div className="flex flex-col text-gray-700 justify-between relative h-fit">
          <div
            className={`transition-transform duration-300 ease-in-out ${
              activeView !== "main" ? "-translate-x-full" : ""
            }`}
          >
            <div className="flex flex-col ">
              <label className="text-2xl font-semibold px-4 py-4">
                Trending
              </label>
              <Divider />
              <Link
                to={"/trending/best-sellers"}
                className="text-xl hover:bg-gray-100 px-4 py-3"
              >
                Best Sellers
              </Link>
              <Link
                to={"/category/most-wishlisted"}
                className="text-xl hover:bg-gray-100 px-4 py-3"
              >
                Most Wishlisted
              </Link>
              <Link
                to={"/category/best-rated"}
                className="text-xl hover:bg-gray-100 px-4 py-3"
              >
                Best Rated
              </Link>
            </div>
            <Divider />
            <div className="px-4 py-4">
              <Link to={"/category"} className="text-2xl font-semibold ">
                Shop By Department
              </Link>
            </div>
            <Divider />
            <button
              onClick={() => setActiveView("tvsAndSoundbars")}
              className="hover:bg-gray-100 w-full text-left flex"
            >
              <h4 className="text-xl px-4 py-4">TVs & Soundbars</h4>
              <Arrow className="h-4 w-auto ml-auto pr-3 fill-white my-auto" />
            </button>
            <button
              onClick={() => setActiveView("pcAndLaptops")}
              className="hover:bg-gray-100 w-full text-left flex"
            >
              <h4 className="text-xl px-4 py-4">Computers & Accessories</h4>
              <Arrow className="h-4 w-auto ml-auto pr-3 fill-white my-auto" />
            </button>
            <button
              onClick={() => setActiveView("smartphonesAndAccessories")}
              className="hover:bg-gray-100 w-full text-left flex"
            >
              <h4 className="text-xl px-4 py-4">Smartphones & Accessories</h4>
              <Arrow className="h-4 w-auto ml-auto pr-3 fill-white my-auto" />
            </button>
            <button
              onClick={() => setActiveView("printersAndInk")}
              className="hover:bg-gray-100 w-full text-left flex"
            >
              <h4 className="text-xl px-4 py-4">Printers & Ink</h4>
              <Arrow className="h-4 w-auto ml-auto pr-3 fill-white my-auto" />
            </button>
            <Divider />
            <div className="flex flex-col">
              <label className="text-2xl font-semibold px-4 py-4">
                Help & Settings
              </label>
              <Divider />
              {isSignedIn && (
                <Link
                  to={"/my-account"}
                  className="text-xl px-4 py-4 hover:bg-gray-100"
                >
                  Your Account
                </Link>
              )}
              {city && (
                <p className="text-xl px-4 py-4">Delivery Location: {city}</p>
              )}
              <Link
                to={"/contact"}
                className="text-xl px-4 py-4 hover:bg-gray-100"
              >
                Contact
              </Link>
              {isSignedIn ? (
                <Link
                  to={"/sign-out"}
                  className="text-xl hover:bg-gray-100 px-4 py-4"
                >
                  Sign Out <ExitIcon className="w-6 h-6 mr-4 inline" />
                </Link>
              ) : (
                <Link
                  to={"/sign-in"}
                  className="text-xl hover:bg-gray-100 px-4 py-4"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          <div
            className={`absolute top-0 transition-transform duration-300 ease-in-out w-full h-full flex flex-col p-4 space-y-4 ${
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
            className={`absolute top-0 transition-transform duration-300 ease-in-out w-full h-full flex flex-col p-4  space-y-4 ${
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
            className={`absolute top-0 transition-transform overflow-none duration-300 ease-in-out w-full h-fit flex flex-col p-4 space-y-4 ${
              activeView !== "printersAndInk"
                ? "translate-x-full overflow-hidden "
                : ""
            }`}
            ref={scrollContainerRef}
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
          className="absolute top-4 left-[calc(80%+10%)] sm:left-[calc(60%+30px)] md:left-[calc(40%+30px)] lg:left-[calc(30%+30px)] w-7 h-7 z-[40]"
          onClick={() => setIsOpen(false)}
        >
          <CloseButton width={32} height={32} className="text-red-500" />
        </button>
      )}
      {children}
    </div>
  );
};

export default BurgerMenu;
