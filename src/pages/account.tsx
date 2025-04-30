import { Link } from "react-router";

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
    { to: "profile", Icon: AddressCard, label: "Address" },
    { to: "orders", Icon: OrderComplete, label: "Orders" },
    { to: "update-password", Icon: Security, label: "Security" },
    { to: "wishlist", Icon: WishlistHeart, label: "Wishlist" },
    { to: "/contact", Icon: Contact, label: "Contact" },
    { to: "sign-out", Icon: Exit, label: "Sign Out" },
  ];

  return (
    <div className="page-spacing">
      <h2 className="mb-3 text-xl font-bold">Your Account Information</h2>
      <div className="grid grid-cols-1 gap-3 xs:grid-cols-2 lg:grid-cols-3">
        {accountMenuItems.map(({ to, Icon, label }) => (
          <InfoCard key={to} to={to} Icon={Icon}>
            {label}
          </InfoCard>
        ))}
      </div>
    </div>
  );
};
