import { ReactComponent as AddressCard } from "@assets/svg/address-card.svg";
import { ReactComponent as OrderComplete } from "@assets/svg/order-complete.svg";
import { ReactComponent as WishlistHeart } from "@assets/svg/wishlist-heart.svg";
import { ReactComponent as Security } from "@assets/svg/security.svg";
import { ReactComponent as Contact } from "@assets/svg/contact.svg";
import { ReactComponent as Exit } from "@assets/svg/exit.svg";
import InfoCard from "./components/InfoCard";

const UserAccount = () => {
  return (
    <>
      <h2 className="text-2xl underline font-[500] ml-4 mt-4 mb-6 text-gray-700">
        Your Account Information
      </h2>
      <div className="flex flex-wrap gap-3 m-[2%]">
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
    </>
  );
};

export default UserAccount;
