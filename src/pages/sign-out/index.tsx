import useFetch from "@/common/Hooks/use-fetch";
import { clearAccessToken } from "@/setup/slices/auth-slice";
import { clearLocalcart } from "@/setup/slices/localCart-slice";
import { clearCredentials } from "@/setup/slices/user-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchData } = useFetch();

  useEffect(() => {
    const signOutAsync = async () => {
      dispatch(clearCredentials());
      dispatch(clearLocalcart());
      dispatch(clearAccessToken());
      await fetchData(`${import.meta.env.VITE_API_URL}/auth/logout`, "POST");
      navigate("/");
    };

    signOutAsync();
  }, []);

  return null;
};

export default SignOut;
