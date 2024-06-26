import { ReactComponent as AddressCard } from "@assets/svg/address-card.svg";
import { ReactComponent as OrderComplete } from "@assets/svg/order-complete.svg";
import { ReactComponent as WishlistHeart } from "@assets/svg/wishlist-heart.svg";
import { ReactComponent as Security } from "@assets/svg/security.svg";
import { ReactComponent as Contact } from "@assets/svg/contact.svg";
import { ReactComponent as Exit } from "@assets/svg/exit.svg";
import InfoCard from "./components/InfoCard";

const UserAccount = () => {
  return (
    <div className="page-spacing">
      <h2 className="text-xl font-bold mb-6">
        Your Account Information
      </h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3">
        <InfoCard to="profile" Icon={AddressCard}>
          Address
        </InfoCard>
        <InfoCard to="orders" Icon={OrderComplete}>
          Orders
        </InfoCard>
        <InfoCard to="update-password" Icon={Security}>
          Security
        </InfoCard>
        <InfoCard to="wishlist" Icon={WishlistHeart}>
          Wishlist
        </InfoCard>
        <InfoCard to="/contact" Icon={Contact}>
          Contact
        </InfoCard>
        <InfoCard to="sign-out" Icon={Exit}>
          Sign Out
        </InfoCard>
      </div>
    </div>
  );
};

export default UserAccount;
