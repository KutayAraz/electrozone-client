import { Link, Outlet } from "react-router-dom";

import { paths } from "@/config/paths";

export const UserProfileLayout = () => {
  const menuItems = [
    { path: paths.app.profile.orders.getHref(), name: "Previous Orders" },
    { path: paths.app.profile.getHref(), name: "Manage Profile" },
    { path: paths.app.security.getHref(), name: "Account Security" },
    { path: paths.app.wishlist.getHref(), name: "Wishlist" },
    { path: paths.misc.contact.getHref(), name: "Contact Us" },
  ];

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
          <Link key={item.path} to={item.path} className="rounded-md px-8 py-2 hover:bg-gray-200">
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};
