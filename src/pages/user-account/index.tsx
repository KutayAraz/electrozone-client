import { ReactComponent as AddressCard } from "@assets/svgs/address-card.svg";
import { ReactComponent as Contact } from "@assets/svgs/contact.svg";
import { ReactComponent as Exit } from "@assets/svgs/exit.svg";
import { ReactComponent as OrderComplete } from "@assets/svgs/order-complete.svg";
import { ReactComponent as Security } from "@assets/svgs/security.svg";
import { ReactComponent as WishlistHeart } from "@assets/svgs/wishlist-heart.svg";

import { InfoCard } from "./components/info-card";

export const UserAccount = () => {
  return (
    <div className="page-spacing">
      <h2 className="mb-6 text-xl font-bold">Your Account Information</h2>
      <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 lg:grid-cols-3">
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
