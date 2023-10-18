import { displayAlert } from "@/setup/slices/alert-slice";
import { clearAccessToken } from "@/setup/slices/auth-slice";
import { clearLocalcart } from "@/setup/slices/localCart-slice";
import { clearCredentials } from "@/setup/slices/user-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  useEffect(() => {
    const signOutAsync = async () => {
      await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });
      dispatch(clearCredentials());
      dispatch(clearLocalcart());
      dispatch(clearAccessToken());
      dispatch(
        displayAlert({
          type: "success",
          message: "Successfully logged out.",
          autoHide: true,
        })
      );
      navigate("/");
    };

    signOutAsync();
  }, []);

  return null;
};

export default SignOut;
