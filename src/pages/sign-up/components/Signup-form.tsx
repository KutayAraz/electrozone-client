import { useFetch } from "@/hooks";
import { displayAlert } from "@/stores/slices/alert-slice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

type SignUpFormInputs = {
  email: string;
  password: string;
  retypedPassword: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password is too short"),
  retypedPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Retyped password is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address name is required"),
  city: yup.string().required("City name is required"),
});

const SignUpForm = () => {
  const dispatch = useDispatch<any>();
  const { isLoading, fetchData } = useFetch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver<SignUpFormInputs>(schema),
    mode: "onBlur",
  });

  const SignUpRequest = async (data: SignUpFormInputs) => {

    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/auth/signup`,
      "POST",
      {
        email: data.email,
        password: data.password,
        retypedPassword: data.retypedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
      }
    );

    if (result?.response.ok) {
      dispatch(
        displayAlert({
          type: "success",
          message: "Your account is created. You can now log in",
          autoHide: true,
        })
      );
      navigate("/sign-in");
    }
  };

  const inputClasses =
    "border-2 border-gray-300 rounded-md px-4 py-2 mt-1 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition duration-300";
  const labelClasses = "text-gray-600 mt-2";
  const errorMessageClasses = "text-red-500 text-sm mt-1";

  return (
    <form action="POST" onSubmit={handleSubmit(SignUpRequest)}>
      <div className="flex flex-col max-w-md mx-2 md:mx-auto p-6 bg-white shadow-md rounded-xl mb-4">
        <h4 className="text-lg font-bold text-gray-800">
          Account Information:
        </h4>

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
        {errors.email && (
          <p className={errorMessageClasses}>{errors.email.message}</p>
        )}

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
        <p className={"text-gray-600 text-sm"}>
          Passwords must be at least 6 characters long.
        </p>
        {errors.password && (
          <p className={errorMessageClasses}>{errors.password.message}</p>
        )}

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
          <p className={errorMessageClasses}>
            {errors.retypedPassword.message}
          </p>
        )}

        <h4 className="text-lg font-bold mt-4 text-gray-800">
          Personal Information:
        </h4>
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
        {errors.firstName && (
          <p className={errorMessageClasses}>{errors.firstName.message}</p>
        )}

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
        {errors.lastName && (
          <p className={errorMessageClasses}>{errors.lastName.message}</p>
        )}

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
        {errors.address && (
          <p className={errorMessageClasses}>{errors.address.message}</p>
        )}

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
        {errors.city && (
          <p className={errorMessageClasses}>{errors.city.message}</p>
        )}

        <button
          type="submit"
          aria-label="Sign up"
          className={`w-full rounded-lg mt-4 py-2 text-white font-semibold ${isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
            } transition duration-300 ease-in-out`}
          disabled={!isValid || isLoading("default")}
        >
          {isLoading("default") ? "Creating your account..." : "Sign Up"}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
