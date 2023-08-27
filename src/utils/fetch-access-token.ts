import { setAccessToken } from "@/setup/slices/auth-slice";
import { AppDispatch } from "@/setup/store";

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

export default fetchNewAccessToken;
