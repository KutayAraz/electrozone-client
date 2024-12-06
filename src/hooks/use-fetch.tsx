import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { displayAlert } from "@/stores/slices/alert-slice";
import { RootState } from "@/stores/store";
import fetchNewAccessToken from "@/utils/renew-token";

export const useFetch = () => {
  const dispatch = useDispatch<any>();
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchData = async (
    url: string,
    method: "GET" | "POST" | "PATCH" | "DELETE" = "GET",
    body?: any,
    withAuth = false,
    withCredentials = false,
    identifier = "default",
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

      // If the response is 401, check the message and if isn't due to invalid credentials
      // try refreshing the token and retry the request
      if (response.status === 401) {
        const result = await response.json();
        if (result.message === "Invalid credentials") {
          setLoadingStates((prev) => ({ ...prev, [identifier]: false }));
          dispatch(
            displayAlert({
              type: "error",
              message: "Invalid credentials. Please enter correct login information.",
              autoHide: true,
            }),
          );
          return;
        } else {
          const newToken = await fetchNewAccessToken();
          if (newToken) {
            response = await doFetch(newToken);
          }
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
              }),
            );
            break;
          case 401:
            navigate("/sign-in", { state: { from: location } });
            dispatch(
              displayAlert({
                type: "error",
                message: "Your session has timed out. Please login again.",
                autoHide: true,
              }),
            );
            break;
          case 404:
            dispatch(
              displayAlert({
                type: "error",
                message: "404 Not Found.",
                autoHide: true,
              }),
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
      console.log("error is ", err);
      dispatch(
        displayAlert({
          type: "error",
          message: "An error occurred. Please try again.",
          autoHide: true,
        }),
      );
    }
  };

  const isLoading = (identifier = "default") => loadingStates[identifier] || false;

  return { fetchData, isLoading, error };
};
