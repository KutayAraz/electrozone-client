import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Spinner } from "@/components/ui/spinner";

import { passwordSchema, PasswordSchema } from "../schemas/change-password-schema";

type PasswordFormProps = {
  onChangePassword: (data: PasswordSchema) => void;
  isUpdating: boolean;
};

export const PasswordForm = ({ onChangePassword, isUpdating }: PasswordFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm<PasswordSchema>({
    resolver: zodResolver<PasswordSchema>(passwordSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: PasswordSchema) => {
    onChangePassword(data);
    reset();
  };

  const inputClasses =
    "border-2 border-gray-300 rounded-md px-4 py-2 mt-1 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition duration-300";
  const labelClasses = "text-gray-600 mt-2";
  const errorMessageClasses = "text-red-500 text-sm mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mx-auto mb-4 flex max-w-md flex-col rounded-xl bg-white p-6 shadow-md">
        <h4 className="text-lg font-bold text-gray-800">Account Information:</h4>

        <label htmlFor="currentPassword" className={labelClasses}>
          Current Password*
        </label>
        <input
          {...register("oldPassword")}
          id="currentPassword"
          type="password"
          className={inputClasses}
          aria-required="true"
          required
        />
        {errors.oldPassword && <p className={errorMessageClasses}>{errors.oldPassword.message}</p>}

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
        {errors.newPassword && <p className={errorMessageClasses}>{errors.newPassword.message}</p>}

        <label htmlFor="retypedNewPassword" className={labelClasses}>
          Confirm New Password*
        </label>
        <input
          {...register("newPasswordRetyped")}
          id="retypedNewPassword"
          type="password"
          className={inputClasses}
          aria-required="true"
          required
        />
        {errors.newPasswordRetyped && (
          <p className={errorMessageClasses}>{errors.newPasswordRetyped.message}</p>
        )}

        <button
          type="submit"
          aria-label="Update Profile"
          className="mx-auto my-2 max-w-[50%] rounded-lg bg-theme-blue px-8 py-2
                   font-[500] text-white hover:bg-theme-purple disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isValid || isUpdating || isSubmitting}
        >
          {isUpdating ? (
            <span className="flex items-center">
              <span className="pr-2">Changing...</span>
              <Spinner size={15} />
            </span>
          ) : (
            "Change Password"
          )}
        </button>
      </div>
    </form>
  );
};
