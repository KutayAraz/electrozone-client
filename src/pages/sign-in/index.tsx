import useFetch from "@/common/Hooks/use-fetch";
import useInput from "@/common/Hooks/use-input";
import { selectAccessToken, setAccessToken } from "@/setup/slices/auth-slice";
import { clearLocalcart } from "@/setup/slices/localCart-slice";
import { CheckoutIntent } from "@/setup/slices/models";
import { clearRedirectPath } from "@/setup/slices/redirect-slice";
import { setCredentials } from "@/setup/slices/user-slice";
import { RootState, store } from "@/setup/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";

type SignInFormInputs = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Please enter your email address"),
  password: yup
    .string()
    .required("Please enter your password")
    .min(
      6,
      "Passwords are least 6 characters long. Please enter a valid password"
    ),
});

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = useSelector((state: RootState) => state.redirect.path);
  const from = location.state?.from || redirectPath || "/";

  const errRef = useRef<any>();
  const { fetchData } = useFetch();
  const [isSending, setIsSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormInputs>({
    resolver: yupResolver<SignInFormInputs>(schema),
    mode: "onBlur",
  });

  const mergeCartsAndNavigate = async () => {
    const localCartItems = store.getState().localCart.items;
    const productsToAdd = localCartItems.map((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/carts/merge-carts`,
      "PATCH",
      productsToAdd,
      true
    );

    if (result?.response.ok) {
      dispatch(clearLocalcart());
    }
  };

  const handleSuccessfulLogin = async (credentials: any) => {
    dispatch(setCredentials({ ...credentials }));
    dispatch(setAccessToken({ accessToken: credentials.access_token }));

    if (
      store.getState().user.userIntent === CheckoutIntent.Normal &&
      store.getState().localCart.items.length > 0
    ) {
      await mergeCartsAndNavigate();
    }

    navigate(from);
    dispatch(clearRedirectPath());
  };

  const loginRequest = async (data: SignInFormInputs) => {
    setIsSending(true);
    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/auth/signin`,
      "POST",
      { email: data.email, password: data.password },
      true,
      true
    );

    if (result?.response.ok) {
      await handleSuccessfulLogin(result.data);
      setIsSending(false);
    }
    setIsSending(false);
  };

  const inputClasses =
    "border-2 border-gray-300 rounded-md px-4 py-2 mt-1 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition duration-300";
  const labelClasses = "text-gray-600 mt-2";
  const errorMessageClasses = "text-red-500 text-sm mt-1";

  return (
    <form action="POST" onSubmit={handleSubmit(loginRequest)}>
      <div className="flex flex-col max-w-md mx-auto p-6 bg-white shadow-md rounded-xl my-4">
        <label htmlFor="email" className={labelClasses}>
          Email*
        </label>
        <input {...register("email")} type="email" className={inputClasses} />
        {errors.email && (
          <p className={errorMessageClasses}>{errors.email.message}</p>
        )}
        <label htmlFor="password" className={labelClasses}>
          Password*
        </label>
        <input
          {...register("password")}
          type="password"
          className={inputClasses}
        />
        {errors.password && (
          <p className={errorMessageClasses}>{errors.password.message}</p>
        )}

        <button
          type="submit"
          className={`w-full rounded-lg mt-4 py-2 text-white font-semibold ${
            isValid ? "bg-theme-blue hover:bg-blue-700" : "bg-gray-400"
          } transition duration-300 ease-in-out`}
          disabled={!isValid}
        >
          {isSending ? "Signing in" : "Sign In"}
        </button>
        <p className="text-gray-600 mt-4 mb-1 text-center">Don't have an account yet?</p>
        <button
          onClick={() => navigate("/sign-up")}
          className={`w-full rounded-lg py-2 text-white font-semibold 
            bg-theme-blue hover:bg-blue-700
           transition duration-300 ease-in-out`}
        >
          Create your electrozone account
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
