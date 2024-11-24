import { displayAlert } from "@/stores/slices/alert-slice";
import { clearAccessToken } from "@/stores/slices/auth-slice";
import { clearLocalcart } from "@/stores/slices/local-cart-slice";
import { clearCredentials } from "@/stores/slices/user-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignOut = (): null => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true; // Flag to check component mount status

    const signOutAsync = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });

        if (isMounted) {
          dispatch(clearCredentials());
          dispatch(clearAccessToken());
          dispatch(clearLocalcart());
          dispatch(displayAlert({
            type: "success",
            message: "Successfully logged out.",
            autoHide: true,
          }));
          navigate("/");
        }
      } catch (error) {
        if (isMounted) {
          dispatch(displayAlert({
            type: "error",
            message: "Logout failed. Please try again.",
            autoHide: true,
          }));
        }
      }
    };

    signOutAsync();

    return () => {
      isMounted = false; // Set the flag to false when component unmounts
    };
  }, [dispatch, navigate]);

  return null;
};

export default SignOut;
