import { Link, Outlet, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute"
import { selectAccessToken, clearAccessToken } from "@/setup/slices/auth-slice";
import { RootState } from "@/setup/store";
import fetchNewAccessToken from "@/utils/renew-token";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useScrollDirection } from "../Hooks/use-scrollDirection";

const UserProfileLayout = () => {
    const menuItems = [{ name: "Previous Orders", link: "/my-account/orders" }, { name: "Manage Profile", link: "/my-account/profile" }, { name: "Account Security", link: "/my-account/update-password" }, { name: "Wishlist", link: "/my-account/wishlist" }, { name: "Contact Us", link: "/contact" },]
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
    const accessToken = useSelector(selectAccessToken);
    const scrollDirection = useScrollDirection();
    useEffect(() => {
        if (!isSignedIn) {
            navigate("/sign-in");
        }
        if (!accessToken) {
            fetchNewAccessToken()
                .then((newToken) => {
                    setLoading(false);
                    if (!newToken) {
                        console.log("triggering from here", location.pathname)
                        navigate("/sign-in");
                    }
                })
                .catch((error) => {
                    dispatch(clearAccessToken());
                    setLoading(false);
                    console.log("triggering from here", location.pathname)
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
            <div className={`flex sticky flex-col shrink-0 border-1 border-[#13193F] rounded-md bg-gray-100 top-32`}>
                <h3 className="text-lg px-8 bg-theme-blue text-white py-4">My Account</h3>
                {menuItems.map((item) => (
                    <Link
                        key={item.link}
                        to={item.link}
                        className="px-12 py-4 rounded-md hover:bg-gray-200"
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
            <div className="w-full">
                <Outlet />
            </div>
        </div>
    );
};
export default UserProfileLayout;