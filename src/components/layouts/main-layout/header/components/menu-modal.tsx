import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { RootState } from "@/stores/store";
import { ReactComponent as ExitIcon } from "@assets/svgs/exit.svg";
import { ReactComponent as CloseButton } from "@assets/svgs/close-button.svg";
import { ReactComponent as UserIcon } from "@assets/svgs/user.svg";
import { ReactComponent as Arrow } from "@assets/svgs/arrow-black.svg";
import { ReactComponent as BackArrow } from "@assets/svgs/go-back.svg";
import { Divider } from "@mui/material";
import { toggleMenuDrawer } from "@/stores/slices/ui-slice";
import { CustomModal } from "@/components/ui/modal";

interface BurgerMenuProps {
  children?: React.ReactNode;
  isOpen: boolean
}

const BurgerMenu = ({ children, isOpen }: BurgerMenuProps) => {
  const location = useLocation();
  const [activeView, setActiveView] = useState("main");
  const city = useSelector((state: RootState) => state.user.city);
  const firstName = useSelector((state: RootState) => state.user.firstName);
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const dispatch = useDispatch()

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
        heightClass={`${activeView === "main" ? "h-full overflow-y-auto" : "min-h-screen h-auto overflow-y-hidden"}`}
        topClass="top-0"
        leftClass="left-0"
        direction="right"
        transitionType="slide"
        transitionDuration={300}
        isOpen={isOpen}
        onClose={() => { dispatch(toggleMenuDrawer(false)); setTimeout((() => setActiveView("main")), 300) }}
        className="overflow-x-hidden"
      >
        <div className="bg-theme-blue shadow-md text-white w-full flex items-center justify-between ">
          {isSignedIn ? (
            <Link
              to={"/my-account"}
              className="flex items-center justify-between w-full p-4"
            >
              <span className="text-2xl">Hello, {firstName}</span>
              <UserIcon className="h-8 w-auto" />
            </Link>
          ) : (
            <Link
              to={"/sign-in"}
              className="flex items-center justify-between w-full p-4"
            >
              <span className="text-xl">Hello, Sign In</span>
              <UserIcon className="h-8 w-auto" />
            </Link>
          )}
        </div>

        <div className="flex flex-col text-gray-700 justify-between relative h-fit">
          <div
            className={`transition-transform duration-300 ease-in-out ${activeView !== "main" ? "-translate-x-full" : ""
              }`}
          >
            <div className="flex flex-col ">
              <label className="text-xl font-bold px-4 py-4">
                Trending
              </label>
              <Divider />
              <Link
                to={"/trending/best-sellers"}
                className="text-lg hover:bg-gray-100 px-4 py-3"
              >
                Best Sellers
              </Link>
              <Link
                to={"/trending/most-wishlisted"}
                className="text-lg hover:bg-gray-100 px-4 py-3"
              >
                Most Wishlisted
              </Link>
              <Link
                to={"/trending/best-rated"}
                className="text-lg hover:bg-gray-100 px-4 py-3"
              >
                Best Rated
              </Link>
            </div>
            <Divider />
            <div className="px-4 py-4">
              <Link to={"/category"} className="text-xl font-bold ">
                Shop By Department
              </Link>
            </div>
            <Divider />
            <button
              onClick={() => setActiveView("tvsAndSoundbars")}
              className="hover:bg-gray-100 w-full text-left flex"
            >
              <h4 className="text-lg px-4 py-4">TVs & Soundbars</h4>
              <Arrow className="h-4 w-auto ml-auto pr-3 fill-white my-auto" />
            </button>
            <button
              onClick={() => setActiveView("pcAndLaptops")}
              className="hover:bg-gray-100 w-full text-left flex"
            >
              <h4 className="text-lg px-4 py-4">Computers & Accessories</h4>
              <Arrow className="h-4 w-auto ml-auto pr-3 fill-white my-auto" />
            </button>
            <button
              onClick={() => setActiveView("smartphonesAndAccessories")}
              className="hover:bg-gray-100 w-full text-left flex"
            >
              <h4 className="text-lg px-4 py-4">Smartphones & Accessories</h4>
              <Arrow className="h-4 w-auto ml-auto pr-3 fill-white my-auto" />
            </button>
            <button
              onClick={() => setActiveView("printersAndInk")}
              className="hover:bg-gray-100 w-full text-left flex"
            >
              <h4 className="text-lg px-4 py-4">Printers & Ink</h4>
              <Arrow className="h-4 w-auto ml-auto pr-3 fill-white my-auto" />
            </button>
            <Divider />
            <div className="flex flex-col">
              <label className="text-xl font-bold px-4 py-4">
                Help & Settings
              </label>
              <Divider />
              {isSignedIn && (
                <Link
                  to={"/my-account"}
                  className="text-lg px-4 py-4 hover:bg-gray-100"
                >
                  Your Account
                </Link>
              )}
              {city && (
                <p className="text-lg px-4 py-4">Delivery Location: {city}</p>
              )}
              <Link
                to={"/contact"}
                className="text-lg px-4 py-4 hover:bg-gray-100"
              >
                Contact
              </Link>
              {isSignedIn ? (
                <Link
                  to={"/sign-out"}
                  className="text-lg hover:bg-gray-100 px-4 py-4"
                >
                  Sign Out <ExitIcon className="w-6 h-6 mr-4 inline" />
                </Link>
              ) : (
                <Link
                  to={"/sign-in"}
                  className="text-lg hover:bg-gray-100 px-4 py-4"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>

          <div
            className={`absolute top-0 transition-transform duration-300 ease-in-out w-full h-full flex flex-col ${activeView !== "tvsAndSoundbars"
              ? "translate-x-full overflow-hidden "
              : ""
              }`}
          >
            <button
              onClick={() => setActiveView("main")}
              className="flex items-center mr-auto text-xl hover:bg-gray-100 w-full p-4 font-bold"
            >
              <BackArrow className="h-6 w-auto inline pr-2 my-auto " />
              Main Menu
            </button>
            <Divider />
            <Link
              to={"/category/tvs-and-soundbars/tvs"}
              className="text-lg hover:bg-gray-100 p-4"
            >
              TVs
            </Link>
            <Link
              to={"/category/tvs-and-soundbars/soundbars"}
              className="text-lg hover:bg-gray-100 p-4"
            >
              Soundbars
            </Link>
          </div>

          <div
            className={`absolute top-0 transition-transform duration-300 ease-in-out w-full h-full flex flex-col ${activeView !== "pcAndLaptops"
              ? "translate-x-full overflow-hidden "
              : ""
              }`}
          >
            <button
              onClick={() => setActiveView("main")}
              className="flex items-center mr-auto text-xl hover:bg-gray-100 w-full p-4 font-bold"
            >
              <BackArrow className="h-6 w-auto inline my-auto pr-2 " />
              Main Menu
            </button>
            <Divider />
            <Link
              to={"/category/computers-and-accessories/computers"}
              className="text-lg hover:bg-gray-100 p-4"
            >
              PCs
            </Link>
            <Link
              to={"/category/computers-and-accessories/laptops"}
              className="text-lg hover:bg-gray-100 p-4"
            >
              Laptops
            </Link>
            <Link
              to={"/category/computers-and-accessories/monitors"}
              className="text-lg hover:bg-gray-100 p-4"
            >
              Monitors
            </Link>
            <Link
              to={"/category/computers-and-accessories/computer-accessories"}
              className="text-lg hover:bg-gray-100 p-4"
            >
              Computer Accessories
            </Link>
          </div>

          <div
            className={`absolute top-0 transition-transform duration-300 ease-in-out w-full h-full flex flex-col ${activeView !== "smartphonesAndAccessories"
              ? "translate-x-full overflow-hidden "
              : ""
              }`}
          >
            <button
              onClick={() => setActiveView("main")}
              className="flex items-center mr-auto text-xl hover:bg-gray-100 w-full p-4 font-bold"
            >
              <BackArrow className="h-6 w-auto inline my-auto" />
              Main Menu
            </button>
            <Divider />
            <Link
              to={"/category/smartphones-and-accessories/smartphones"}
              className="text-lg hover:bg-gray-100 p-4"
            >
              Smartphones
            </Link>
            <Link
              to={
                "/category/smartphones-and-accessories/smartphone-accessories"
              }
              className="text-lg hover:bg-gray-100 p-4"
            >
              Smartphone Accessories
            </Link>
          </div>

          <div
            className={`absolute top-0 transition-transform overflow-none duration-300 ease-in-out w-full h-fit flex flex-col ${activeView !== "printersAndInk"
              ? "translate-x-full overflow-hidden"
              : ""
              }`}
            ref={scrollContainerRef}
          >
            <button
              onClick={() => setActiveView("main")}
              className="flex items-center mr-auto text-xl hover:bg-gray-100 w-full p-4 font-bold"
            >
              <BackArrow className="h-6 w-auto inline my-auto" />
              Main Menu
            </button>
            <Divider />
            <Link
              to={"/category/printers-and-ink/laser-printers"}
              className="text-lg hover:bg-gray-100 p-4"
            >
              Laser Printers
            </Link>
            <Link
              to={"/category/printers-and-ink/inkjet-printers"}
              className="text-lg hover:bg-gray-100 p-4"
            >
              Inkjet Printers
            </Link>
            <Link
              to={"/category/printers-and-ink/ink"}
              className="text-lg hover:bg-gray-100 p-4"
            >
              Ink
            </Link>
          </div>
        </div>
      </CustomModal>
      {isOpen && (
        <button
          className="absolute top-4 left-[340px] xs:left-[452px] w-7 h-7 z-[40]"
          onClick={() => { dispatch(toggleMenuDrawer(false)); setTimeout((() => setActiveView("main")), 300) }}
        >
          <CloseButton width={32} height={32} className="text-red-500" />
        </button>
      )}
      {children}
    </div>
  );
};

export default BurgerMenu;
