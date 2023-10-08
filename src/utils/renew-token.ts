import { setAccessToken } from "@/setup/slices/auth-slice";
import { store } from "@/setup/store";

export async function fetchNewAccessToken() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
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
