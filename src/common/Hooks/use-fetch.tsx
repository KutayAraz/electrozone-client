import { displayAlert } from "@/setup/slices/alert-slice";
import { RootState, store } from "@/setup/store";
import fetchNewAccessToken from "@/utils/renew-token";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useFetch = () => {
  const dispatch = useDispatch<any>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchData = async (
    url: string,
    method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
    body?: any,
    withAuth: boolean = false,
    withCredentials: boolean = false,
    identifier: string = "default"
  ) => {
    setLoadingStates((prev) => ({ ...prev, [identifier]: true }));
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
        credentials: withCredentials ? "include" : "same-origin",
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
      const responseMessage = await response.json()

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
            navigate("/sign-in", { state: { from: location } });
            if (responseMessage.message === "Invalid credentials") {
              dispatch(
                displayAlert({
                  type: "error",
                  message: "Invalid credentials. Please enter correct login information.",
                  autoHide: true,
                })
              );
            } else {
              dispatch(
                displayAlert({
                  type: "error",
                  message: "Your session has timed out. Please login again.",
                  autoHide: true,
                })
              );
            }

            break;
          case 404:
            dispatch(
              displayAlert({
                type: "error",
                message: "404 Not Found.",
                autoHide: true,
              })
            );
            break;
          default:
            throw new Error("Network response was not ok.");
        }
      }

      const data = await response.json();
      setLoadingStates((prev) => ({ ...prev, [identifier]: false }));
      return { response, data };
    } catch (err: any) {
      setLoadingStates((prev) => ({ ...prev, [identifier]: false }));
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

  const isLoading = (identifier: string = "default") =>
    loadingStates[identifier] || false;

  return { fetchData, isLoading, error };
};

export default useFetch;
