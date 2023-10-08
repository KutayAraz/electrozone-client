import { displayAlert } from "@/setup/slices/alert-slice";
import { RootState } from "@/setup/store";
import fetchNewAccessToken from "@/utils/renew-token";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useFetch = () => {
  const dispatch = useDispatch<any>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchData = async (
    url: string,
    method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
    body?: any,
    withAuth: boolean = false
  ) => {
    setLoading(true);
    setError(null);

    const doFetch = async (token: string | null) => {
      const headers: any = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };

      if (withAuth && token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
      return response;
    };

    try {
      let response = await doFetch(accessToken);

      // If the response is 401, try refreshing the token and retry the request
      if (response.status === 401) {
        const newToken = await fetchNewAccessToken();
        if (newToken) {
          response = await doFetch(newToken);
        }
      }

      if (!response.ok) {
        switch (response.status) {
          case 400:
            dispatch(
              displayAlert({
                type: "error",
                message: "Bad request.",
                autoHide: true,
              })
            );
            break;
          case 401:
            navigate("/sign-in");
            dispatch(
              displayAlert({
                type: "error",
                message: "Unauthorized. Please login again.",
                autoHide: true,
              })
            );
            break;
          default:
            throw new Error("Network response was not ok.");
        }
      }

      const data = await response.json();
      setLoading(false);
      return { response, data };
    } catch (err: any) {
      setLoading(false);
      setError(err.message);
      dispatch(
        displayAlert({
          type: "error",
          message: "An error occurred. Please try again.",
          autoHide: true,
        })
      );
    }
  };

  return { fetchData, loading, error };
};



export default useFetch;
