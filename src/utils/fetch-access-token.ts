import { setAccessToken } from "@/setup/slices/auth-slice";
import { AppDispatch, store } from "@/setup/store";

export async function fetchNewAccessToken() {
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
    store.dispatch(setAccessToken({ accessToken: access_token }));
    return access_token;
  } else {
    return null;
  }
}

export default fetchNewAccessToken;
