import { SidebarProps } from "@common/Layout/models";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "@/setup/slices/ui-slice";
import { State } from "./models";

const Sidebar = ({
  user: { city } = { city: "Select your location" },
}: SidebarProps) => {
  const dispatch = useDispatch();
  const handleSections = (section: string) => {
    dispatch(uiActions.toggleSections(section));
  };

  const handleSideNav = () => {
    dispatch(uiActions.toggleSideNav());
  };

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
          <p>TVs</p>
          <p>Soundbars</p>
          <h4 className="text-lg font-bold">PCs & Laptops</h4>
          <p>PCs</p>
          <p>Laptops</p>
          <p>Monitors</p>
          <p>Computer Accessories</p>
          <h4 className="text-lg font-bold">Printers & Ink</h4>
          <p>Laser Printers</p>
          <p>Inkjet Printers</p>
          <p>Ink</p>
          <h4 className="text-lg font-bold">Phones & Accessories</h4>
          <p>Smartphones</p>
          <p>Phone Accessories</p>
        </ul>
        <div>
          <h4 className="text-lg font-bold">Help & Settings</h4>
          <p>Your Account</p>
          <p>{city}</p>
          <p>Customer Service</p>
          <p>Sign out</p>
        </div>
      </div>
    </Modal>
  );
};

export default Sidebar;
