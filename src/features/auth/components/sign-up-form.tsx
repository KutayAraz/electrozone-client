import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { displayAlert } from "@/stores/slices/alert-slice";

import { useSignUpMutation } from "../api/auth-api";
import { signUpSchema } from "../schemas/sign-up-schema";
import { SignUpFormInputs } from "../types/form-inputs";

import { AuthForm } from "./auth-form";

const inputClasses =
  "border-2 border-gray-300 rounded-md px-4 py-2 mt-1 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition duration-300";
const labelClasses = "text-gray-600 mt-2";
const errorMessageClasses = "text-red-500 text-sm mt-1";

export const SignUp = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [signUp, { isLoading }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(signUpSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormInputs) => {
    try {
      await signUp(data).unwrap();
      dispatch(
        displayAlert({
          type: "success",
          message: "Your account is created. You can now log in",
          autoHide: true,
        }),
      );
      navigate("/sign-in");
    } catch (error) {
      dispatch(
        displayAlert({
          type: "error",
          message: "Failed to create account. Please try again.",
          autoHide: true,
        }),
      );
      console.error("Failed to sign up:", error);
    }
  };

  return (
    <AuthForm
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
      isLoading={isLoading}
      submitText="Sign Up"
      loadingText="Creating your account..."
    >
      <h4 className="text-lg font-bold text-gray-800">Account Information:</h4>

      <label htmlFor="email" className={labelClasses}>
        Email<span aria-hidden="true">*</span>
      </label>
      <input
        {...register("email")}
        id="email"
        type="email"
        className={inputClasses}
        aria-required="true"
        required
      />
      {errors.email && <p className={errorMessageClasses}>{errors.email.message}</p>}

      <label htmlFor="password" className={labelClasses}>
        Password<span aria-hidden="true">*</span>
      </label>
      <input
        {...register("password")}
        type="password"
        id="password"
        className={inputClasses}
        aria-required="true"
        required
      />
      <p className="text-sm text-gray-600">Passwords must be at least 6 characters long.</p>
      {errors.password && <p className={errorMessageClasses}>{errors.password.message}</p>}

      <label htmlFor="retypedPassword" className={labelClasses}>
        Confirm Password<span aria-hidden="true">*</span>
      </label>
      <input
        {...register("retypedPassword")}
        type="password"
        id="retypedPassword"
        className={inputClasses}
        aria-required="true"
        required
      />
      {errors.retypedPassword && (
        <p className={errorMessageClasses}>{errors.retypedPassword.message}</p>
      )}

      <h4 className="mt-4 text-lg font-bold text-gray-800">Personal Information:</h4>

      <label htmlFor="firstName" className={labelClasses}>
        First name<span aria-hidden="true">*</span>
      </label>
      <input
        {...register("firstName")}
        id="firstName"
        type="text"
        className={inputClasses}
        aria-required="true"
        required
      />
      {errors.firstName && <p className={errorMessageClasses}>{errors.firstName.message}</p>}

      <label htmlFor="lastName" className={labelClasses}>
        Last name<span aria-hidden="true">*</span>
      </label>
      <input
        {...register("lastName")}
        id="lastName"
        type="text"
        className={inputClasses}
        aria-required="true"
        required
      />
      {errors.lastName && <p className={errorMessageClasses}>{errors.lastName.message}</p>}

      <label htmlFor="address" className={labelClasses}>
        Address<span aria-hidden="true">*</span>
      </label>
      <input
        {...register("address")}
        id="address"
        type="text"
        className={inputClasses}
        aria-required="true"
        required
      />
      {errors.address && <p className={errorMessageClasses}>{errors.address.message}</p>}

      <label htmlFor="city" className={labelClasses}>
        City/State<span aria-hidden="true">*</span>
      </label>
      <input
        {...register("city")}
        id="city"
        type="text"
        className={inputClasses}
        aria-required="true"
        required
      />
      {errors.city && <p className={errorMessageClasses}>{errors.city.message}</p>}
    </AuthForm>
  );
};
