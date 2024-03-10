import useFetch from "@/common/Hooks/use-fetch";
import { displayAlert } from "@/setup/slices/alert-slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";

type FormInputs = {
  currentPassword: string;
  newPassword: string;
  retypedNewPassword?: string;
};

const schema = yup.object().shape({
  currentPassword: yup.string().required("Current Password is required"),
  newPassword: yup
    .string()
    .required("New Password is required")
    .min(6, "Password must be at least 6 characters long")
    .notOneOf(
      [yup.ref("currentPassword")],
      "New password can't be the same as the current password"
    ),
  retypedNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), undefined], "Passwords must match"),
});

const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<FormInputs>({
    resolver: yupResolver<FormInputs>(schema),
    mode: "onChange",
  });

  const { fetchData } = useFetch();
  const dispatch = useDispatch<any>();

  const handlePasswordChange = async (data: FormInputs) => {
    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/auth/update-password`,
      "PATCH",
      {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
        newPasswordRetyped: data.retypedNewPassword,
      },
      true
    );

    if (result?.response.ok) {
      dispatch(
        displayAlert({
          type: "success",
          message: "Your password has been successfully updated.",
          autoHide: true,
        })
      );
      reset();
      return;
    }
  };

  const inputClasses =
    "border-2 border-gray-300 rounded-md px-4 py-2 mt-1 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition duration-300";
  const labelClasses = "text-gray-600 mt-2";
  const errorMessageClasses = "text-red-500 text-sm mt-1";

  return (
    <form onSubmit={handleSubmit(handlePasswordChange)}>
      <div className="flex flex-col max-w-md mx-auto p-6 bg-white shadow-md rounded-xl mb-4">
        <h4 className="text-lg font-bold text-gray-800">
          Account Information:
        </h4>

        <label htmlFor="currentPassword" className={labelClasses}>
          Current Password*
        </label>
        <input
          {...register("currentPassword")}
          id="currentPassword"
          type="password"
          className={inputClasses}
          aria-required="true"
          required
        />
        {errors.currentPassword && (
          <p className={errorMessageClasses}>
            {errors.currentPassword.message}
          </p>
        )}

        <label htmlFor="newPassword" className={labelClasses}>
          New Password*
        </label>
        <input
          {...register("newPassword")}
          id="newPassword"
          type="password"
          className={inputClasses}
          aria-required="true"
          required
        />
        {errors.newPassword && (
          <p className={errorMessageClasses}>
            {errors.newPassword.message}
          </p>
        )}

        <label htmlFor="retypedNewPassword" className={labelClasses}>
          Confirm New Password*
        </label>
        <input
          {...register("retypedNewPassword")}
          id="retypedNewPassword"
          type="password"
          className={inputClasses}
          aria-required="true"
          required
        />
        {errors.retypedNewPassword && (
          <p className={errorMessageClasses}>
            {errors.retypedNewPassword.message}
          </p>
        )}

      <button
        type="submit"
        aria-label="Update Password"
        className={`w-full rounded-lg mt-4 py-2 text-white font-semibold ${
          isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
        } transition duration-300 ease-in-out`}
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Changing your password..." : "Change password"}
      </button>
      </div>
    </form>
  );
};

export default UpdatePassword;
