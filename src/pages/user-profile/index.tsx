import useFetch from "@/common/Hooks/use-fetch";
import { displayAlert } from "@/setup/slices/alert-slice";
import { updateUserInfo } from "@/setup/slices/user-slice";
import { RootState } from "@/setup/store";
import {
  UnauthorizedError,
  loaderFetchProtected,
} from "@/utils/loader-fetch-protected";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, defer, redirect, useLoaderData } from "react-router-dom";

const UserProfile = () => {
  const dispatch = useDispatch<any>();
  const city = useSelector((state: RootState) => state.user.city);
  const { userInfo }: any = useLoaderData();
  const [email, setEmail] = useState<string | null>(userInfo.email);
  const [address, setAddress] = useState<string | null>(userInfo.address);
  const [userCity, setUserCity] = useState<string | null>(city);
  const { fetchData } = useFetch();

  const emailRef: any | null = useRef();
  const addressRef: any | null = useRef();
  const cityRef: any | null = useRef();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    const requestBody = {
      email: emailRef.current?.value,
      address: addressRef.current?.value,
      city: cityRef.current?.value,
    };
  
    const filteredBody = Object.fromEntries(
      Object.entries(requestBody).filter(
        ([_, value]) => value && value.trim() !== ""
      )
    );
  
    if (Object.keys(filteredBody).length === 0) {
      return;
    }
  
    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/user/profile`,
      "PATCH",
      filteredBody,
      true
    );
  
    if (result?.response.ok) {
      // Update the placeholders, but keep the actual input values empty
      if(emailRef.current?.value) setEmail(emailRef.current?.value);
      if(addressRef.current?.value) setAddress(addressRef.current?.value);
      if(cityRef.current?.value) setUserCity(cityRef.current?.value);
      
      // Clear input values (which are distinct from placeholders)
      emailRef.current.value = "";
      addressRef.current.value = "";
      cityRef.current.value = "";
  
      dispatch(updateUserInfo({ city: result.data.city }));
  
      dispatch(
        displayAlert({
          type: "success",
          message: "Your information has been successfully updated.",
          autoHide: true,
        })
      );
    }
  }

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="max-w-xs mx-auto flex flex-col text-center mt-2 "
      >
        <label htmlFor="" className="text-lg text-theme-blue font-[500]">
          Email
        </label>
        <input
          ref={emailRef}
          placeholder={email || ""}
          type="text"
          className="border-2 border-theme-blue rounded-md pl-2 text-lg mb-1"
        ></input>
        <label htmlFor="" className="text-lg text-theme-blue font-[500]">
          Address
        </label>
        <input
          ref={addressRef}
          placeholder={address || ""}
          type="text"
          className="border-2 border-theme-blue rounded-md text-lg pl-2"
        ></input>
        <label htmlFor="" className="text-lg text-theme-blue font-[500]">
          City/State
        </label>
        <input
          ref={cityRef}
          placeholder={userCity || ""}
          type="text"
          className="border-2 border-theme-blue rounded-md text-lg pl-2"
        ></input>
        <button
          type="submit"
          className="bg-theme-blue hover:bg-[#A34393] rounded-lg font-[500] text-white max-w-[50%] my-2 mx-auto px-4 py-2"
        >
          Update Profile
        </button>
      </Form>
    </>
  );
};

export default UserProfile;

export const loader = async (request: any) => {
  try {
    const userInfo = await loaderFetchProtected(
      `${import.meta.env.VITE_API_URL}/user/profile`,
      "GET",
      request.request
    );

    return defer({
      userInfo,
    });
  } catch (error: unknown) {
    if (error instanceof UnauthorizedError) {
      return redirect("/sign-in");
    }
  }
};
