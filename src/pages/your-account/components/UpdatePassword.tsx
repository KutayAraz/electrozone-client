import { selectAccessToken } from "@/setup/slices/auth-slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Form } from "react-router-dom";
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
  } = useForm<FormInputs>({
    resolver: yupResolver<FormInputs>(schema),
    mode: "onBlur",
  });

  const accessToken = useSelector(selectAccessToken);
  console.log(accessToken + "access");

  const handlePasswordChange = async (data: FormInputs) => {
    const response = await fetch("http://localhost:3000/auth/update-password", {
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
    });

    if (response.status === 200) {
      return console.log("success");
    }
  };

  return (
    <form
      className="max-w-xs flex flex-col mx-auto text-center justify-items-center mt-2"
      onSubmit={handleSubmit(handlePasswordChange)}
    >
      <label htmlFor="currentPassword">Current Password:</label>
      <input
        {...register("currentPassword")}
        type="password"
        className="border-2 border-[#13193F] rounded-lg"
      />
      {errors.currentPassword && <p>{errors.currentPassword.message}</p>}

      <label htmlFor="newPassword">New Password:</label>
      <input
        {...register("newPassword")}
        type="password"
        className="border-2 border-[#13193F] rounded-lg"
      />
      {errors.newPassword && <p>{errors.newPassword.message}</p>}

      <label htmlFor="retypedNewPassword">Confirm New Password:</label>
      <input
        {...register("retypedNewPassword")}
        type="password"
        className="border-2 border-[#13193F] rounded-lg"
      />
      {errors.retypedNewPassword && <p>{errors.retypedNewPassword.message}</p>}

      <button
        type="submit"
        className="bg-[#13193F] hover:bg-[#A34393] rounded-lg text-white max-w-[50%] my-2 mx-auto px-6 py-1"
        disabled={!isValid}
      >
        Confirm
      </button>
    </form>
  );
};

export default UpdatePassword;
