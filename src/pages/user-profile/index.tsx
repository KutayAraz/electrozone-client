import { updateUserInfo } from "@/setup/slices/user-slice";
import { RootState } from "@/setup/store";
import { fetchNewAccessToken } from "@/utils/fetch-access-token";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const city = useSelector((state: RootState) => state.user.city);
  const accessToken = useSelector((state: any) => state.auth.accessToken);

  const [email, setEmail] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const emailRef: any | null = useRef();
  const addressRef: any | null = useRef();
  const cityRef: any | null = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user/profile`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const result = await response.json();
        setAddress(result.address);
        setEmail(result.email);
      } catch (err) {}
    };

    fetchData();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let currentToken = accessToken;

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

    const response = await fetch(`${import.meta.env.API_URL}/user/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${currentToken}`,
      },
      body: JSON.stringify(filteredBody),
    });

    if (response.status === 401) {
      await fetchNewAccessToken();
      navigate("/sign-in");
    } else if (response?.status === 200) {
      const result = await response.json();
      dispatch(updateUserInfo({ city: result.city }));
    } else {
      console.log(response?.status);
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
          placeholder={city || ""}
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
