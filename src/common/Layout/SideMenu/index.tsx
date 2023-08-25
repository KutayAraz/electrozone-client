import { SidebarProps } from "@common/Layout/models";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "@/setup/slices/ui-slice";
// import { State } from "./models";
import { Link, useLocation } from "react-router-dom";
import { RootState } from "@/setup/store";
import { useEffect } from "react";

const Sidebar = ({
  user: { city } = { city: "Select your location" },
}: SidebarProps) => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const handleSections = (section: string) => {
  //   dispatch(uiActions.toggleSections(section));
  // };

  const handleSideNav = () => {
    dispatch(uiActions.toggleSideNav());
  };

  useEffect(() => {
    dispatch(uiActions.closeSideNav());
  }, [location]);

  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);

  return (
    <Modal onClose={handleSideNav}>
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
          <Link to={"tvs_and_soundbars/tvs"}>TVs</Link>
          <Link to={"tvs_and_soundbars/soundbars"}>Soundbars</Link>
          <h4 className="text-lg font-bold">PCs & Laptops</h4>
          <Link to={"/pcs"}>PCs</Link>
          <Link to={"/laptops"}>Laptops</Link>
          <Link to={"/monitors"}>Monitors</Link>
          <Link to={"/computer-accessories"}>Computer Accessories</Link>
          <h4 className="text-lg font-bold">Printers & Ink</h4>
          <Link to={"/laser-printers"}>Laser Printers</Link>
          <Link to={"/inkjet-printers"}>Inkjet Printers</Link>
          <Link to={"/ink"}>Ink</Link>
          <h4 className="text-lg font-bold">Phones & Accessories</h4>
          <Link to={"/smartphones"}>Smartphones</Link>
          <Link to={"/smartphone-accessories"}>Phone Accessories</Link>
        </ul>
        <div>
          <h4 className="text-lg font-bold">Help & Settings</h4>
          {isSignedIn ? (
            <Link to={"/your-profile"}>Your Account</Link>
          ) : (
            <Link to={"/sign-in"}>Sign In</Link>
          )}
          {isSignedIn && <p>{city}</p>}
          <p>Customer Service</p>
          {isSignedIn && <Link to={"/sign-out"}>Sign Out</Link>}
        </div>
      </div>
    </Modal>
  );
};

export default Sidebar;
