import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as BurgerIcon } from "@assets/svg/burger.svg";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { RootState } from "@/setup/store";
import { ReactComponent as ExitIcon } from "@assets/svg/exit.svg";
import CustomizableModal from "../Modal/CustomizableModal";
import { ReactComponent as CloseButton } from "@assets/svg/close-button.svg";

interface BurgerMenuProps {
  className: string;
  children?: React.ReactNode;
}

const BurgerMenu = ({ className, children }: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const city = useSelector((state: RootState) => state.user.city);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  return (
    <>
      <button
        className={`items-center ${className}`}
        onClick={() => setIsOpen(true)}
      >
        <BurgerIcon width={32} height={32} />
      </button>
      <CustomizableModal
        width="80%"
        height="100vh"
        top="0"
        left="0"
        direction="left"
        transitionType="slide"
        transitionDuration={300}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        className="p-4"
      >
        <div className="flex flex-col text-black">
          <div>
            <h4 className="text-lg font-bold">Trending</h4>
            <p>Best Sellers</p>
            <p>New Releases</p>
            <p>Most Wishlisted Products</p>
          </div>
          <ul className="flex flex-col">
            <h3>Shop by Department</h3>
            <h4 className="text-lg font-bold">TVs & Soundbars</h4>
            <Link to={"/category/tvs-and-soundbars/tvs"}>TVs</Link>
            <Link to={"/category/tvs-and-soundbars/soundbars"}>Soundbars</Link>
            <h4 className="text-lg font-bold">PCs & Laptops</h4>
            <Link to={"/category/computers-and-accessories/computers"}>
              PCs
            </Link>
            <Link to={"/category/computers-and-accessories/laptops"}>
              Laptops
            </Link>
            <Link to={"/category/computers-and-accessories/monitors"}>
              Monitors
            </Link>
            <Link
              to={"/category/computers-and-accessories/computer-accessories"}
            >
              Computer Accessories
            </Link>
            <h4 className="text-lg font-bold">Printers & Ink</h4>
            <Link to={"/category/printers-and-ink/laser-printers"}>
              Laser Printers
            </Link>
            <Link to={"/category/printers-and-ink/inkjet-printers"}>
              Inkjet Printers
            </Link>
            <Link to={"/category/printers-and-ink/ink"}>Ink</Link>
            <h4 className="text-lg font-bold">Phones & Accessories</h4>
            <Link to={"/category/smartphones-and-accessories/smartphones"}>
              Smartphones
            </Link>
            <Link
              to={
                "/category/smartphones-and-accessories/smartphone-accessories"
              }
            >
              Phone Accessories
            </Link>
          </ul>
          <div>
            <h4 className="text-lg font-bold">Help & Settings</h4>
            {isSignedIn ? (
              <Link to={"/my-account"}>Your Account</Link>
            ) : (
              <Link to={"/sign-in"}>Sign In</Link>
            )}
            {city && <p>{city}</p>}
            <p>Customer Service</p>
            {isSignedIn && (
              <div>
                <Link to={"/sign-out"}>
                  Sign Out <ExitIcon className="w-6 h-6 mr-4 inline" />
                  
                </Link>
              </div>
            )}
          </div>
        </div>
      </CustomizableModal>
      {isOpen && (
        <button
          className="absolute top-2 left-[calc(80%+20px)] w-7 h-7 bg-gray-300 z-[35]"
          onClick={() => setIsOpen(false)}
        >
          <CloseButton width={32} height={32} />
        </button>
      )}
    </>
  );
};

export default BurgerMenu;
