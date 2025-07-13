import { Link } from "react-router";

import { paths } from "@/config/paths";
import AddressCard from "@assets/svgs/address-card.svg?react";
import Contact from "@assets/svgs/contact.svg?react";
import Exit from "@assets/svgs/exit.svg?react";
import OrderComplete from "@assets/svgs/order-complete.svg?react";
import Security from "@assets/svgs/security.svg?react";
import WishlistHeart from "@assets/svgs/wishlist-heart.svg?react";

type InfoCardProps = {
  to: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
};

export const InfoCard = ({ to, children, Icon }: InfoCardProps) => {
  return (
    <Link
      to={to}
      className="flex grow items-center rounded-md border border-gray-300 p-4 text-theme-blue transition-all hover:bg-gray-100 hover:shadow-lg"
    >
      <span className="text-lg">{children}</span>
      <Icon className="ml-auto size-16" />
    </Link>
  );
};

export const AccountPage = () => {
  const accountMenuItems = [
    { path: paths.app.profile.getHref(), Icon: AddressCard, label: "Address" },
    { path: paths.app.profile.orders.getHref(), Icon: OrderComplete, label: "Orders" },
    { path: paths.app.security.getHref(), Icon: Security, label: "Security" },
    { path: paths.app.wishlist.getHref(), Icon: WishlistHeart, label: "Wishlist" },
    { path: paths.misc.contact.getHref(), Icon: Contact, label: "Contact" },
    { path: paths.auth.signOut.getHref(), Icon: Exit, label: "Sign Out" },
  ];

  return (
    <div className="page-spacing">
      <h2 className="mb-3 text-xl font-bold">Your Account Information</h2>
      <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 lg:grid-cols-3">
        {accountMenuItems.map(({ path, Icon, label }) => (
          <InfoCard key={path} to={path} Icon={Icon}>
            {label}
          </InfoCard>
        ))}
      </div>
    </div>
  );
};
