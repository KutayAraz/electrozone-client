import useInput from "@/common/Hooks/use-input";
import { UserState } from "@/setup/slices/models";
import { userActions } from "@/setup/slices/user-slice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const isEmail = (value: string) => value.includes("@");
const isPassword = (value: string) => value.length > 5;

const SignInForm = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
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
  const [username, setUsername] = useState("");

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);

    if (!formIsValid) {
      setIsSending(false);
      return;
    }

    const response = await fetch("http://localhost:3000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
      }),
    });

    if (response.status === 201) {
      const result = await response.json();
      setUsername(result.firstName);
      dispatch(
        userActions.setUserInfo({
          userId: result.userId,
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
          address: result.address,
          city: result.city,
        })
      );
      navigate("/");
    } else {
      setFormStatus("Invalid credentials");
    }

    setIsSending(false);
  };

  const inputClasses = "border-2 border-[#13193F] rounded-md";
  const inputErrorClasses =
    "border-2 border-[#13193F] rounded-md border-red-700";

  const emailClasses = emailHasError ? inputErrorClasses : inputClasses;
  const passwordClasses = passwordHasError ? inputErrorClasses : inputClasses;

  const errorText = (
    <p className="text-red-700 text-sm">This area is required.</p>
  );

  return (
    <form action="POST" onSubmit={submitHandler}>
      <div className="flex flex-col max-w-sm text-center mx-auto">
        <label htmlFor="email">Your e-mail</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          required
          className={emailClasses}
        />
        {emailHasError && errorText}
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          required
          className={passwordClasses}
        />
        {emailHasError && errorText}

        <p className="font-semibold">{formStatus}</p>
        <button
          type="submit"
          className={`max-w-[40%] mx-auto w-full border-2 bg-[#13193F] text-white p-2 ${
            !formIsValid ? "bg-gray-500 " : "bg-[#13193F] hover:bg-[#A34393]"
          }`}
          disabled={!formIsValid}
        >
          {isSending ? "Signing in.." : "Sign in!"}
        </button>
        <p>Don't have an account yet?</p>
        <button
          onClick={() => navigate("/sign-up")}
          className="max-w-[80%] mx-auto w-full border-2 text-white p-2 bg-[#13193F] hover:bg-[#A34393] rounded-lg"
        >
          Create your Electrozone account
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
