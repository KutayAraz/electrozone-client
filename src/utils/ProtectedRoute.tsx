import {
  selectAccessToken,
  setAccessToken,
  clearAccessToken,
} from "@/setup/slices/auth-slice";
import { AppDispatch } from "@/setup/store";
import { ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, Route, redirect, useNavigate } from "react-router-dom";

export async function fetchNewAccessToken(dispatch: AppDispatch) {
  const response = await fetch("http://localhost:3000/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    credentials: "include",
  });

  if (response.status === 200) {
    const result = await response.json();
    const { access_token } = result;
    dispatch(setAccessToken({ accessToken: access_token }));
    
    return access_token;
  } else {
    return null;
  }
}

const ProtectedRoute = () => {
  const accessToken = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      fetchNewAccessToken(dispatch)
        .then((newToken) => {
          setLoading(false);
          // If you want to keep the user in the current location and not redirect them to sign-in after fetching the new token, you can check the token here again and navigate accordingly
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
