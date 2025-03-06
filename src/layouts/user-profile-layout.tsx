import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export const UserProfileLayout = () => {
  const menuItems = [
    { name: "Previous Orders", link: "/my-account/orders" },
    { name: "Manage Profile", link: "/my-account/profile" },
    { name: "Account Security", link: "/my-account/update-password" },
    { name: "Wishlist", link: "/my-account/wishlist" },
    { name: "Contact Us", link: "/contact" },
  ];

  const [loading, setLoading] = useState(true);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page-spacing flex items-start space-x-6">
      <div className="w-full">
        <Outlet />
      </div>
      <div
        className={`sticky top-40 hidden shrink-0 flex-col rounded-md border-1 border-theme-blue bg-gray-100 sm:flex`}
      >
        <h3 className="bg-theme-blue px-8 py-2 text-white">My Account</h3>
        {menuItems.map((item) => (
          <Link key={item.link} to={item.link} className="rounded-md px-8 py-2 hover:bg-gray-200">
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
