import { Divider } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { CustomModal } from "@/components/ui/modal/custom-modal";
import { toggleMenuDrawer } from "@/stores/slices/ui-slice";
import { RootState } from "@/stores/store";
import { ReactComponent as Arrow } from "@assets/svgs/arrow-black.svg";
import { ReactComponent as CloseButton } from "@assets/svgs/close-button.svg";
import { ReactComponent as ExitIcon } from "@assets/svgs/exit.svg";
import { ReactComponent as BackArrow } from "@assets/svgs/go-back.svg";
import { ReactComponent as UserIcon } from "@assets/svgs/user.svg";

interface BurgerMenuProps {
  children?: React.ReactNode;
  isOpen: boolean;
}

const BurgerMenu = ({ children, isOpen }: BurgerMenuProps) => {
  const location = useLocation();
  const [activeView, setActiveView] = useState("main");
  const city = useSelector((state: RootState) => state.user.city);
  const firstName = useSelector((state: RootState) => state.user.firstName);
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleMenuDrawer(false));
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

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   // When activeView changes, scroll to the top of the container
  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollTop = 0;
  //   }
  // }, [activeView]);

  return (
    <div className="flex">
      <CustomModal
        widthClass="w-[320px] xs:w-[432px]"
        heightClass={`${
          activeView === "main" ? "h-full overflow-y-auto" : "min-h-screen h-auto overflow-y-hidden"
        }`}
        topClass="top-0"
        leftClass="left-0"
        direction="right"
        transitionType="slide"
        transitionDuration={300}
        isOpen={isOpen}
        onClose={() => {
          dispatch(toggleMenuDrawer(false));
          setTimeout(() => setActiveView("main"), 300);
        }}
        className="overflow-x-hidden"
        ariaLabel="Main Menu Modal"
      >
        <div className="flex w-full items-center justify-between bg-theme-blue text-white shadow-md ">
          {isSignedIn ? (
            <Link to={"/my-account"} className="flex w-full items-center justify-between p-4">
              <span className="text-2xl">Hello, {firstName}</span>
              <UserIcon className="h-8 w-auto" />
            </Link>
          ) : (
            <Link to={"/sign-in"} className="flex w-full items-center justify-between p-4">
              <span className="text-xl">Hello, Sign In</span>
              <UserIcon className="h-8 w-auto" />
            </Link>
          )}
        </div>

        <div className="relative flex h-fit flex-col justify-between text-gray-700">
          <div
            className={`transition-transform duration-300 ease-in-out ${
              activeView !== "main" ? "-translate-x-full" : ""
            }`}
          >
            <div className="flex flex-col ">
              <h2 className="p-4 text-xl font-bold">Trending</h2>
              <Divider />
              <Link to={"/trending/best-sellers"} className="px-4 py-3 text-lg hover:bg-gray-100">
                Best Sellers
              </Link>
              <Link
                to={"/trending/most-wishlisted"}
                className="px-4 py-3 text-lg hover:bg-gray-100"
              >
                Most Wishlisted
              </Link>
              <Link to={"/trending/best-rated"} className="px-4 py-3 text-lg hover:bg-gray-100">
                Best Rated
              </Link>
            </div>
            <Divider />
            <div className="p-4">
              <Link to={"/category"} className="text-xl font-bold ">
                Shop By Department
              </Link>
            </div>
            <Divider />
            <button
              onClick={() => setActiveView("tvsAndSoundbars")}
              className="flex w-full text-left hover:bg-gray-100"
            >
              <h4 className="p-4 text-lg">TVs & Soundbars</h4>
              <Arrow className="my-auto ml-auto h-4 w-auto fill-white pr-3" />
            </button>
            <button
              onClick={() => setActiveView("pcAndLaptops")}
              className="flex w-full text-left hover:bg-gray-100"
            >
              <h4 className="p-4 text-lg">Computers & Accessories</h4>
              <Arrow className="my-auto ml-auto h-4 w-auto fill-white pr-3" />
            </button>
            <button
              onClick={() => setActiveView("smartphonesAndAccessories")}
              className="flex w-full text-left hover:bg-gray-100"
            >
              <h4 className="p-4 text-lg">Smartphones & Accessories</h4>
              <Arrow className="my-auto ml-auto h-4 w-auto fill-white pr-3" />
            </button>
            <button
              onClick={() => setActiveView("printersAndInk")}
              className="flex w-full text-left hover:bg-gray-100"
            >
              <h4 className="p-4 text-lg">Printers & Ink</h4>
              <Arrow className="my-auto ml-auto h-4 w-auto fill-white pr-3" />
            </button>
            <Divider />
            <div className="flex flex-col">
              <h2 className="p-4 text-xl font-bold">Help & Settings</h2>
              <Divider />
              {isSignedIn && (
                <Link to={"/my-account"} className="p-4 text-lg hover:bg-gray-100">
                  Your Account
                </Link>
              )}
              {city && <p className="p-4 text-lg">Delivery Location: {city}</p>}
              <Link to={"/contact"} className="p-4 text-lg hover:bg-gray-100">
                Contact
              </Link>
              {isSignedIn ? (
                <Link to={"/sign-out"} className="p-4 text-lg hover:bg-gray-100">
                  Sign Out <ExitIcon className="mr-4 inline size-6" />
                </Link>
              ) : (
                <Link to={"/sign-in"} className="p-4 text-lg hover:bg-gray-100">
                  Sign In
                </Link>
              )}
            </div>
          </div>

          <div
            className={`absolute top-0 flex size-full flex-col transition-transform duration-300 ease-in-out ${
              activeView !== "tvsAndSoundbars" ? "translate-x-full overflow-hidden " : ""
            }`}
          >
            <button
              onClick={() => setActiveView("main")}
              className="mr-auto flex w-full items-center p-4 text-xl font-bold hover:bg-gray-100"
            >
              <BackArrow className="my-auto inline h-6 w-auto pr-2 " />
              Main Menu
            </button>
            <Divider />
            <Link to={"/category/tvs-and-soundbars/tvs"} className="p-4 text-lg hover:bg-gray-100">
              TVs
            </Link>
            <Link
              to={"/category/tvs-and-soundbars/soundbars"}
              className="p-4 text-lg hover:bg-gray-100"
            >
              Soundbars
            </Link>
          </div>

          <div
            className={`absolute top-0 flex size-full flex-col transition-transform duration-300 ease-in-out ${
              activeView !== "pcAndLaptops" ? "translate-x-full overflow-hidden " : ""
            }`}
          >
            <button
              onClick={() => setActiveView("main")}
              className="mr-auto flex w-full items-center p-4 text-xl font-bold hover:bg-gray-100"
            >
              <BackArrow className="my-auto inline h-6 w-auto pr-2 " />
              Main Menu
            </button>
            <Divider />
            <Link
              to={"/category/computers-and-accessories/computers"}
              className="p-4 text-lg hover:bg-gray-100"
            >
              PCs
            </Link>
            <Link
              to={"/category/computers-and-accessories/laptops"}
              className="p-4 text-lg hover:bg-gray-100"
            >
              Laptops
            </Link>
            <Link
              to={"/category/computers-and-accessories/monitors"}
              className="p-4 text-lg hover:bg-gray-100"
            >
              Monitors
            </Link>
            <Link
              to={"/category/computers-and-accessories/computer-accessories"}
              className="p-4 text-lg hover:bg-gray-100"
            >
              Computer Accessories
            </Link>
          </div>

          <div
            className={`absolute top-0 flex size-full flex-col transition-transform duration-300 ease-in-out ${
              activeView !== "smartphonesAndAccessories" ? "translate-x-full overflow-hidden " : ""
            }`}
          >
            <button
              onClick={() => setActiveView("main")}
              className="mr-auto flex w-full items-center p-4 text-xl font-bold hover:bg-gray-100"
            >
              <BackArrow className="my-auto inline h-6 w-auto" />
              Main Menu
            </button>
            <Divider />
            <Link
              to={"/category/smartphones-and-accessories/smartphones"}
              className="p-4 text-lg hover:bg-gray-100"
            >
              Smartphones
            </Link>
            <Link
              to={"/category/smartphones-and-accessories/smartphone-accessories"}
              className="p-4 text-lg hover:bg-gray-100"
            >
              Smartphone Accessories
            </Link>
          </div>

          <div
            className={`absolute top-0 flex h-fit w-full flex-col transition-transform duration-300 ease-in-out ${
              activeView !== "printersAndInk" ? "translate-x-full overflow-hidden" : ""
            }`}
            ref={scrollContainerRef}
          >
            <button
              onClick={() => setActiveView("main")}
              className="mr-auto flex w-full items-center p-4 text-xl font-bold hover:bg-gray-100"
            >
              <BackArrow className="my-auto inline h-6 w-auto" />
              Main Menu
            </button>
            <Divider />
            <Link
              to={"/category/printers-and-ink/laser-printers"}
              className="p-4 text-lg hover:bg-gray-100"
            >
              Laser Printers
            </Link>
            <Link
              to={"/category/printers-and-ink/inkjet-printers"}
              className="p-4 text-lg hover:bg-gray-100"
            >
              Inkjet Printers
            </Link>
            <Link to={"/category/printers-and-ink/ink"} className="p-4 text-lg hover:bg-gray-100">
              Ink
            </Link>
          </div>
        </div>
      </CustomModal>
      {isOpen && (
        <button
          className="absolute left-[340px] top-4 z-40 size-7 xs:left-[452px]"
          onClick={() => {
            dispatch(toggleMenuDrawer(false));
            setTimeout(() => setActiveView("main"), 300);
          }}
        >
          <CloseButton width={32} height={32} className="text-red-500" />
        </button>
      )}
      {children}
    </div>
  );
};

export default BurgerMenu;
