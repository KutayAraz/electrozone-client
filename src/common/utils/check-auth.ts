import { RootState } from "@/setup/store";
import { useSelector } from "react-redux";
import { redirect } from "react-router-dom";

export function checkAuthLoader(){
    const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn)

    if(!isSignedIn){
        return redirect("/sign-in")
    }
}