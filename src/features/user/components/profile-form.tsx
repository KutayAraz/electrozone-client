import { useForm } from "react-hook-form";

import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { Spinner } from "@/components/ui/spinner";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema } from "../schemas/profile-schema";
import { UpdateUser, User } from "../types";

type ProfileFormProps = {
  userInfo: Partial<User>;
  onUpdateProfile: (data: UpdateUser) => void;
  isUpdating: boolean;
};

export const ProfileForm = ({ userInfo, onUpdateProfile, isUpdating }: ProfileFormProps) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      email: "",
      address: "",
      city: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: UpdateUser) => {
    const filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != ""));

    if (Object.keys(filteredData).length === 0) {
      dispatch(
        displayNotification({
          type: NotificationType.WARNING,
          message: "No changes to update.",
        }),
      );
      return;
    }

    onUpdateProfile(filteredData);
    reset();
  };

  const inputClasses =
    "border-2 border-gray-300 rounded-md px-4 py-2 mt-1 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition duration-300";
  const labelClasses = "text-gray-600 mt-2";
  const errorMessageClasses = "text-red-500 text-sm mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex max-w-md flex-col rounded-xl bg-white p-6 shadow-md xs:mx-auto">
        <h2 className="text-lg font-semibold text-gray-800">My Profile:</h2>
        <label htmlFor="email" className={labelClasses}>
          Email
        </label>
        <input
          {...register("email")}
          id="email"
          type="text"
          placeholder={userInfo.email}
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
          placeholder={userInfo.address}
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
          placeholder={userInfo.city}
          className={inputClasses}
        />
        {errors.city && <p className={errorMessageClasses}>{errors.city.message}</p>}

        <button
          type="submit"
          aria-label="Update Profile"
          className="mx-auto my-2 max-w-[50%] rounded-lg bg-theme-blue px-8 py-2
           font-[500] text-white hover:bg-theme-purple disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isUpdating || isSubmitting || Object.keys(errors).length > 0 || !isDirty}
        >
          {isUpdating ? (
            <span className="flex items-center">
              <span className="pr-2">Updating...</span>
              <Spinner size={15} />
            </span>
          ) : (
            "Update Profile"
          )}
        </button>
      </div>
    </form>
  );
};
