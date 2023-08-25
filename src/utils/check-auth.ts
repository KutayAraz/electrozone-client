import { redirect } from "react-router-dom";
import { store } from "@/setup/store";

export function checkAuthLoader(): any {
  const accessToken = store.getState().auth.accessToken;

  if (!accessToken) {
    return redirect("/sign-in");
  }
  return accessToken;
}
