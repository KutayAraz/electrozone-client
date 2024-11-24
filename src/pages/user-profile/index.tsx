import { displayAlert } from "@/stores/slices/alert-slice";
import { updateUserInfo } from "@/stores/slices/user-slice";
import { RootState } from "@/stores/store";
import {
  UnauthorizedError,
  loaderFetchProtected,
} from "@/utils/loader-fetch-protected";
import { useDispatch, useSelector } from "react-redux";
import { defer, redirect, useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { useFetch } from "@/hooks";

interface UpdateProfileInputs {
  email?: string | null;
  address?: string | null;
  city?: string | null;
}

const schema = yup.object({
  email: yup.string().email("Invalid email address").nullable().notRequired(),
  address: yup
    .string()
    .nullable()
    .notRequired()
    .test(
      "address-test",
      "Please enter a valid address",
      (value) => !value || value.length >= 3
    ),
  city: yup
    .string()
    .nullable()
    .notRequired()
    .test(
      "city-test",
      "Please enter a valid city",
      (value) => !value || value.length >= 2
    ),
});

export const UserProfile = () => {
  const dispatch = useDispatch<any>();
  const { userInfo }: any = useLoaderData();
  const cityFromStore = useSelector((state: RootState) => state.user.city);
  const [emailPlaceholder, setEmailPlaceholder] = useState(
    userInfo.email || ""
  );
  const [addressPlaceholder, setAddressPlaceholder] = useState(
    userInfo.address || ""
  );
  const [cityPlaceholder, setCityPlaceholder] = useState(cityFromStore || "");
  const { fetchData } = useFetch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      address: "",
      city: "",
    },
  });

  const onSubmit = async (data: UpdateProfileInputs) => {
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value && value.trim() !== "")
    );

    if (Object.keys(filteredData).length === 0) {
      dispatch(displayAlert({
        type: "warning",
        message: "No changes to update.",
        autoHide: true,
      }));
      return;
    }

    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/user/profile`,
      "PATCH",
      filteredData,
      true
    );

    if (result?.response.ok) {
      dispatch(updateUserInfo({ city: result.data.city }));
      dispatch(
        displayAlert({
          type: "success",
          message: "Your information has been successfully updated.",
          autoHide: true,
        })
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col max-w-md mx-2 xs:mx-auto p-6 bg-white shadow-md rounded-xl my-4">
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
        {errors.email && (
          <p className={errorMessageClasses}>{errors.email.message}</p>
        )}

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
        {errors.address && (
          <p className={errorMessageClasses}>{errors.address.message}</p>
        )}

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
        {errors.city && (
          <p className={errorMessageClasses}>{errors.city.message}</p>
        )}

        <button
          type="submit"
          aria-label="Update Profile"
          className="bg-theme-blue hover:bg-[#A34393] rounded-lg font-[500] text-white max-w-[50%] my-2 mx-auto px-4 py-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Updating..." : "Update Profile"}
        </button>
      </div>
    </form>
  );
};

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
