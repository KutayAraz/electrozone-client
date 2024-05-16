import { Link, Outlet, useNavigate } from "react-router-dom";
import { selectAccessToken, clearAccessToken } from "@/setup/slices/auth-slice";
import { RootState } from "@/setup/store";
import fetchNewAccessToken from "@/utils/renew-token";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserProfileLayout = () => {
    const menuItems = [
        { name: "Previous Orders", link: "/my-account/orders" },
        { name: "Manage Profile", link: "/my-account/profile" },
        { name: "Account Security", link: "/my-account/update-password" },
        { name: "Wishlist", link: "/my-account/wishlist" },
        { name: "Contact Us", link: "/contact" },
    ]
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
                .catch((error) => {
                    dispatch(clearAccessToken());
                    setLoading(false);
                    navigate("/sign-in");
                });
        } else {
            setLoading(false);
        }
    }, [accessToken, dispatch, navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-spacing flex items-start space-x-6">
            <div className="w-full">
                <Outlet />
            </div>
            <div className={`hidden sm:flex sticky flex-col shrink-0 border-1 border-[#13193F] rounded-md bg-gray-100 top-40`}>
                <h3 className="px-8 bg-theme-blue text-white py-2">My Account</h3>
                {menuItems.map((item) => (
                    <Link
                        key={item.link}
                        to={item.link}
                        className="px-8 py-2 rounded-md hover:bg-gray-200"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>

        </div>
    );
};
export default UserProfileLayout;