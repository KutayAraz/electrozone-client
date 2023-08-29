import {
  selectAccessToken,
  setAccessToken,
  clearAccessToken,
} from "@/setup/slices/auth-slice";
import { AppDispatch, RootState } from "@/setup/store";
import { ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Route, redirect, useNavigate } from "react-router-dom";
import fetchNewAccessToken from "./fetch-access-token";

const ProtectedRoute = () => {
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn)

  useEffect(() => {
    if(!isSignedIn){
      navigate("/sign-in")
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

  // If we have the accessToken at this point, render the children (protected content)
  if (accessToken) {
    return <Outlet />;
  }

  // If no token, just redirect. But this might be redundant because our useEffect would have already handled this.
  navigate("/sign-in");
  return null;
};

export default ProtectedRoute;
