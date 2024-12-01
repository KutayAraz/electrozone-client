import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";

import { selectAccessToken, clearAccessToken } from "@/stores/slices/auth-slice";
import { RootState } from "@/stores/store";
import fetchNewAccessToken from "@/utils/renew-token";

export const UserProfileLayout = () => {
  const menuItems = [
    { name: "Previous Orders", link: "/my-account/orders" },
    { name: "Manage Profile", link: "/my-account/profile" },
    { name: "Account Security", link: "/my-account/update-password" },
    { name: "Wishlist", link: "/my-account/wishlist" },
    { name: "Contact Us", link: "/contact" },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const accessToken = useSelector(selectAccessToken);

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/sign-in");
    }
    if (!accessToken) {
      fetchNewAccessToken()
        .then((newToken) => {
          setLoading(false);
          if (!newToken) {
            navigate("/sign-in");
          }
        })
        .catch(() => {
          dispatch(clearAccessToken());
          setLoading(false);
          navigate("/sign-in");
        });
    } else {
      setLoading(false);
    }
  }, [accessToken, dispatch, navigate, isSignedIn]);

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
