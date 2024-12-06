import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { selectAccessToken, clearAccessToken } from "@/stores/slices/auth-slice";
import { RootState } from "@/stores/store";

import fetchNewAccessToken from "../utils/renew-token";

const ProtectedRoute = () => {
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
            console.log("triggering from here", location.pathname);
            navigate("/sign-in");
          }
        })
        .catch(() => {
          dispatch(clearAccessToken());
          setLoading(false);
          console.log("triggering from here", location.pathname);
          navigate("/sign-in");
        });
    } else {
      setLoading(false);
    }
  }, [accessToken, dispatch, navigate, isSignedIn]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (accessToken) {
    return <Outlet />;
  }
  return null;
};

export default ProtectedRoute;
