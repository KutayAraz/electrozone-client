import { SidebarProps } from "@common/Layout/models";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { uiActions } from "@/setup/slices/ui-slice";

const Sidebar = ({
  user: { city } = { city: "Select your location" },
}: SidebarProps) => {
  const dispatch = useDispatch();
  const handleSideNav = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <Modal onClose={handleSideNav}>
      <div className="flex flex-col">
        <div>
          <h4>Trending</h4>
          <p>Best Sellers</p>
          <p>New Releases</p>
          <p>Most Wishlisted Products</p>
        </div>
        <div>
          <h4>Shop by Department</h4>
          <p>Automotive & Motorcycles</p>
          <p>Books</p>
          <p>Electronics</p>
          <p>Fashion</p>
          <p>Home & Garden</p>
          <p>Sports & Outdoors</p>
        </div>
        <div>
          <h4>Help & Settings</h4>
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
