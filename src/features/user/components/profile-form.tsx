import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { displayAlert } from "@/stores/slices/alert-slice";
import { updateUserInfo } from "@/stores/slices/user-slice";
import { RootState } from "@/stores/store";

import { useUpdateUserMutation } from "../api/user";
import { profileSchema } from "../schema/profile-schema";
import { UpdateUser } from "../types";

export const UserProfile = ({ userInfo }: UpdateUser) => {
  const dispatch = useDispatch<any>();
  const cityFromStore = useSelector((state: RootState) => state.user.city);
  const [emailPlaceholder, setEmailPlaceholder] = useState(userInfo.email || "");
  const [addressPlaceholder, setAddressPlaceholder] = useState(userInfo.address || "");
  const [cityPlaceholder, setCityPlaceholder] = useState(cityFromStore || "");
  const [updatedUser, { isLoading, isError }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      email: "",
      address: "",
      city: "",
    },
  });

  const handleSubmit = async (data: UpdateUser) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([value]) => value && value.trim() !== ""),
    );

    if (Object.keys(filteredData).length === 0) {
      dispatch(
        displayAlert({
          type: "warning",
          message: "No changes to update.",
          autoHide: true,
        }),
      );
      return;
    }

    const result: any = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
      method: "PATCH",
      credentials: "include", // Enables cookie sending
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(filteredData), // Convert data to JSON string
    });

    if (result?.response.ok) {
      dispatch(updateUserInfo({ city: result.data.city }));
      dispatch(
        displayAlert({
          type: "success",
          message: "Your information has been successfully updated.",
          autoHide: true,
        }),
      );
      if (data.email) setEmailPlaceholder(data.email);
      if (data.address) setAddressPlaceholder(data.address);
      if (data.city) setCityPlaceholder(data.city);
      reset();
    }
  };

  const inputClasses =
    "border-2 border-gray-300 rounded-md px-4 py-2 mt-1 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition duration-300";
  const labelClasses = "text-gray-600 mt-2";
  const errorMessageClasses = "text-red-500 text-sm mt-1";

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-2 my-4 flex max-w-md flex-col rounded-xl bg-white p-6 shadow-md xs:mx-auto">
        <h2 className="text-lg font-semibold text-gray-800">My Profile:</h2>
        <label htmlFor="email" className={labelClasses}>
          Email
        </label>
        <input
          {...register("email")}
          id="email"
          type="text"
          placeholder={emailPlaceholder}
          className={inputClasses}
        />
        {errors.email && <p className={errorMessageClasses}>{errors.email.message}</p>}

        <label htmlFor="address" className={labelClasses}>
          Address
        </label>
        <input
          {...register("address")}
          id="address"
          type="text"
          placeholder={addressPlaceholder}
          className={inputClasses}
        />
        {errors.address && <p className={errorMessageClasses}>{errors.address.message}</p>}

        <label htmlFor="city" className={labelClasses}>
          City/State
        </label>
        <input
          {...register("city")}
          id="city"
          type="text"
          placeholder={cityPlaceholder}
          className={inputClasses}
        />
        {errors.city && <p className={errorMessageClasses}>{errors.city.message}</p>}

        <button
          type="submit"
          aria-label="Update Profile"
          className="mx-auto my-2 max-w-[50%] rounded-lg bg-theme-blue px-4 py-2 font-[500] text-white hover:bg-theme-purple"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </form>
  );
};
