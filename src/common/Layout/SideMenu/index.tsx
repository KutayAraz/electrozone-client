import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "@/setup/store";
import { useEffect, useState } from "react";
import { ReactComponent as ExitIcon } from "@assets/svg/exit.svg";
import CustomizableModal from "@/common/Modal/CustomizableModal";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const city = useSelector((state: RootState) => state.user.city);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);

  return (
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
    >
      <div className="flex flex-col">
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
          <Link to={"/category/computers-and-accessories/computers"}>PCs</Link>
          <Link to={"/category/computers-and-accessories/laptops"}>
            Laptops
          </Link>
          <Link to={"/category/computers-and-accessories/monitors"}>
            Monitors
          </Link>
          <Link to={"/category/computers-and-accessories/computer-accessories"}>
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
            to={"/category/smartphones-and-accessories/smartphone-accessories"}
          >
            Phone Accessories
          </Link>
        </ul>
        <div>
          <h4 className="text-lg font-bold">Help & Settings</h4>
          {isSignedIn ? (
            <Link to={"/your-profile"}>Your Account</Link>
          ) : (
            <Link to={"/sign-in"}>Sign In</Link>
          )}
          {city && <p>{city}</p>}
          <p>Customer Service</p>
          {isSignedIn && (
            <div>
              <Link to={"/sign-out"}>
                Sign Out
                <ExitIcon className="w-6 h-6" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </CustomizableModal>
  );
};

export default Sidebar;
