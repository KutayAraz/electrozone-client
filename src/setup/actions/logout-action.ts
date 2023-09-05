import { clearAccessToken } from "../slices/auth-slice";
import { clearCredentials } from "../slices/user-slice";
import { store } from "../store";

export const logout = () => async (dispatch: any) => {
  try {
    const accessToken = store.getState().auth.accessToken;
    await fetch(`${import.meta.env.API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch(clearAccessToken());
    dispatch(clearCredentials());
  } catch (error) {
    console.log("There was an error");
  }
};
