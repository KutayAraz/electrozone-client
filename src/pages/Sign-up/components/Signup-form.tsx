import useInput from "@/common/Hooks/use-input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const isNotEmpty = (value: string) => value.trim() !== "";
const isEmail = (value: string) => value.includes("@");
const isPassword = (value: string) => value.length > 5;

const SignUpForm = () => {
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

  const {
    value: retypedPasswordValue,
    isValid: retypedPasswordIsValid,
    hasError: retypedPasswordHasError,
    valueChangeHandler: retypedPasswordChangeHandler,
    inputBlurHandler: retypedPasswordBlurHandler,
  } = useInput(isPassword);
  const {
    value: firstNameValue,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
  } = useInput(isNotEmpty);
  const {
    value: lastNameValue,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
  } = useInput(isNotEmpty);

  const {
    value: addressValue,
    isValid: addressIsValid,
    hasError: addressHasError,
    valueChangeHandler: topicChangeHandler,
    inputBlurHandler: topicBlurHandler,
  } = useInput(isNotEmpty);
  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
  } = useInput(isNotEmpty);

  let formIsValid = false;

  if (
    emailIsValid &&
    passwordIsValid &&
    retypedPasswordIsValid &&
    firstNameIsValid &&
    lastNameIsValid &&
    addressIsValid &&
    cityIsValid &&
    passwordValue === retypedPasswordValue
  ) {
    formIsValid = true;
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);

    if (!formIsValid) {
      setIsSending(false);
      return;
    }

    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      mode: 'cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue,
        retypedPassword: retypedPasswordValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        address: addressValue,
        city: cityValue,
      }),
    });
    if (response.status === 201) {
      navigate("/");
    } else {
      setFormStatus("Please provide valid information.");
    }
    setIsSending(false);
  };

  const inputClasses = "border-2 border-[#13193F] rounded-md";
  const inputErrorClasses =
    "border-2 border-[#13193F] rounded-md border-red-700";

  const emailClasses = emailHasError ? inputErrorClasses : inputClasses;

  const passwordClasses = passwordHasError ? inputErrorClasses : inputClasses;
  const retypedPasswordClasses = retypedPasswordHasError
    ? inputErrorClasses
    : inputClasses;
  const firstNameClasses = firstNameHasError ? inputErrorClasses : inputClasses;
  const lastNameClasses = lastNameHasError ? inputErrorClasses : inputClasses;
  const addressClasses = addressHasError ? inputErrorClasses : inputClasses;
  const cityClasses = cityHasError ? inputErrorClasses : inputClasses;

  const errorText = (
    <p className="text-red-700 text-sm">This area is required.</p>
  );

  return (
    <form action="POST" onSubmit={submitHandler}>
      <div className="flex flex-col max-w-sm text-center mx-auto">
        <label htmlFor="email">Your e-mail*</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          required
          className={emailClasses}
        />
        {emailHasError && errorText}
        <label htmlFor="password">Password*</label>
        <input
          type="password"
          id="password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          required
          className={passwordClasses}
        />
        {emailHasError && errorText}
        <label htmlFor="retypedPassword">Confirm Password*</label>
        <input
          type="password"
          id="retypedPassword"
          onChange={retypedPasswordChangeHandler}
          onBlur={retypedPasswordBlurHandler}
          required
          className={retypedPasswordClasses}
        />
        <p>Passwords must be at least 6 characters.</p>
        {emailHasError && errorText}
        <label htmlFor="firstName">Your name</label>
        <input
          type="text"
          id="firstName"
          value={firstNameValue}
          name="firstName"
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
          required
          className={firstNameClasses}
        />
        {firstNameHasError && errorText}
        <label htmlFor="lastName">Your last name*</label>
        <input
          type="text"
          id="lastName"
          value={lastNameValue}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          required
          className={lastNameClasses}
        />
        {lastNameHasError && errorText}

        <label htmlFor="address">Your address*</label>
        <input
          type="text"
          id="address"
          value={addressValue}
          className={addressClasses}
          onChange={topicChangeHandler}
          onBlur={topicBlurHandler}
        />
        {addressHasError && errorText}
        <label htmlFor="city">Your city*</label>
        <input
          type="city"
          id="city"
          value={cityValue}
          className={cityClasses}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityHasError && errorText}
        <p className="font-semibold">{formStatus}</p>
        <button
          type="submit"
          className={` border-2 bg-[#13193F] text-white p-2 ${
            !formIsValid ? "bg-gray-500 " : "bg-[#13193F] hover:bg-[#A34393]"
          }`}
          disabled={!formIsValid}
        >
          {isSending ? "Creating a new user.." : "Sign up!"}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
