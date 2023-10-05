import { displayAlert } from "@/setup/slices/alert-slice";
import { selectAccessToken } from "@/setup/slices/auth-slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
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

const UpdatePassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormInputs>({
    resolver: yupResolver<FormInputs>(schema),
    mode: "onBlur",
  });

  const dispatch = useDispatch<any>();
  const accessToken = useSelector(selectAccessToken);

  const handlePasswordChange = async (data: FormInputs) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/update-password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          oldPassword: data.currentPassword,
          newPassword: data.newPassword,
          newPasswordRetyped: data.retypedNewPassword,
        }),
      }
    );

    if (response.status === 200) {
      dispatch(
        displayAlert({
          type: "success",
          message: "Your password has successfuly updated.",
          autoHide: true,
        })
      );
      reset();
      return;
    }
  };

  return (
    <form
      className="max-w-xs flex flex-col mx-auto text-center justify-items-center mt-2"
      onSubmit={handleSubmit(handlePasswordChange)}
    >
      <label
        htmlFor="currentPassword"
        className="text-lg font-[500] text-theme-blue"
      >
        Current Password:
      </label>
      <input
        {...register("currentPassword")}
        type="password"
        className="border-2 border-theme-blue rounded-lg pl-2 text-xl"
      />
      {errors.currentPassword && <p>{errors.currentPassword.message}</p>}

      <label
        htmlFor="newPassword"
        className="text-lg font-[500] text-theme-blue"
      >
        New Password:
      </label>
      <input
        {...register("newPassword")}
        type="password"
        className="border-2 border-theme-blue rounded-lg pl-2 text-xl"
      />
      {errors.newPassword && <p>{errors.newPassword.message}</p>}

      <label
        htmlFor="retypedNewPassword"
        className="text-lg font-[500] text-theme-blue"
      >
        Confirm New Password:
      </label>
      <input
        {...register("retypedNewPassword")}
        type="password"
        className="border-2 border-theme-blue rounded-lg pl-2 text-xl"
      />
      {errors.retypedNewPassword && (
        <p className="text-red-600 my-1">{errors.retypedNewPassword.message}</p>
      )}

      <button
        type="submit"
        className={`${
          !isValid ? "bg-gray-500" : "bg-theme-blue hover:bg-[#A34393]"
        }  rounded-lg font-[500] text-white max-w-[50%] my-2 mx-auto px-4 py-2`}
        disabled={!isValid}
      >
        Confirm
      </button>
    </form>
  );
};

export default UpdatePassword;
