import { clearAccessToken, setAccessToken } from "../slices/auth-slice";
import { clearCredentials, setCredentials } from "../slices/user-slice";
import { store } from "../store";

export const signin = () => async (dispatch: any) => {
  try {
    const response = await fetch(`${import.meta.env.API_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (response.status === 200) {
      const result = await response.json();
      dispatch(setCredentials({ ...result }));
      dispatch(setAccessToken(result.access_token));
    }
  } catch (error) {
    console.log("There was an error");
  }
};
