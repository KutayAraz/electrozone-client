import useFetch from "@/common/Hooks/use-fetch";
import useInput from "@/common/Hooks/use-input";
import { selectAccessToken, setAccessToken } from "@/setup/slices/auth-slice";
import { clearLocalcart } from "@/setup/slices/localCart-slice";
import { CheckoutIntent } from "@/setup/slices/models";
import { clearRedirectPath } from "@/setup/slices/redirect-slice";
import { setCredentials } from "@/setup/slices/user-slice";
import { RootState, store } from "@/setup/store";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const isEmail = (value: string) => value.includes("@");
const isPassword = (value: string) => value.length > 5;

const SignInForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = useSelector((state: RootState) => state.redirect.path);
  const from = location.state?.from || redirectPath || "/";

  console.log("redirect", redirectPath);
  console.log("from", location.state?.from);

  const errRef = useRef<any>();
  const { fetchData } = useFetch();
  const [formStatus, setFormStatus] = useState("");
  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isPassword);
  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

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

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formIsValid) return;

    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/auth/signin`,
      "POST",
      { email: emailValue, password: passwordValue },
      true,
      true
    );

    if (result?.response.ok) {
      await handleSuccessfulLogin(result.data);
    } else {
      setFormStatus("Invalid credentials");
    }
  };

  const inputClasses =
    "border-2 border-[#13193F] rounded-md w-[80%] mx-auto px-1 py-1";
  const inputErrorClasses =
    "border-2 border-[#13193F] rounded-md border-red-700 w-[80%] mx-auto px-1 py-1";

  const emailClasses = emailHasError ? inputErrorClasses : inputClasses;
  const passwordClasses = passwordHasError ? inputErrorClasses : inputClasses;

  const errorText = (
    <p className="text-red-700 text-sm mb-2">This area is required.</p>
  );

  return (
    <>
      <p
        ref={errRef}
        className={formStatus ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {formStatus}
      </p>
      <form action="POST" onSubmit={submitHandler}>
        <div className="flex flex-col max-w-sm text-center mx-auto mt-2">
          <label htmlFor="email" className="font-semibold ">
            Your e-mail
          </label>
          <input
            type="email"
            id="email"
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            required
            className={emailClasses}
          />
          {emailHasError && errorText}
          <label htmlFor="password" className="font-semibold ">
            Password
          </label>
          <input
            type="password"
            id="password"
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            required
            className={`${passwordClasses}`}
          />
          {emailHasError && errorText}

          <p className="font-semibold">{formStatus}</p>
          <button
            type="submit"
            className={`max-w-[40%] mx-auto w-full border-2 bg-[#13193F] text-white p-2 rounded-lg ${
              !formIsValid ? "bg-gray-500 " : "bg-[#13193F] hover:bg-[#febd69]"
            } md:focus:border-orange-500 md:active:border-orange-500 mt-2`}
            disabled={!formIsValid}
          >
            Sign in
          </button>
          <p>Don't have an account yet?</p>
          <button
            onClick={() => navigate("/sign-up")}
            className="max-w-[80%] mx-auto w-full border-2 text-white p-2 bg-[#13193F] hover:bg-[#febd69] rounded-lg"
          >
            create your electrozone account
          </button>
        </div>
      </form>
    </>
  );
};

export default SignInForm;
