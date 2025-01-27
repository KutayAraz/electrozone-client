import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { clearLocalcart } from "@/stores/slices/local-cart-slice";
import { CheckoutIntent } from "@/stores/slices/models";
import { clearRedirectPath } from "@/stores/slices/redirect-slice";
import { setCredentials } from "@/stores/slices/user-slice";
import { setWishlist } from "@/stores/slices/wishlist-slice";
import { RootState } from "@/stores/store";

import { useSignInMutation, useMergeCartsMutation, useGetWishlistQuery } from "../api/auth-api";
import { signInSchema } from "../schemas/sign-in-schema";
import { SignInFormInputs } from "../types/form-inputs";

import { AuthForm } from "./auth-form";

const inputClasses =
  "border-2 border-gray-300 rounded-md px-4 py-2 mt-1 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition duration-300";
const labelClasses = "text-gray-600 mt-2";
const errorMessageClasses = "text-red-500 text-sm mt-1";

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [signIn, { isLoading }] = useSignInMutation();
  const [mergeCarts] = useMergeCartsMutation();

  const redirectPath = useSelector((state: RootState) => state.redirect.path);
  const localCartItems = useSelector((state: RootState) => state.localCart.items);
  const userIntent = useSelector((state: RootState) => state.user.userIntent);
  const from = location.state?.from || redirectPath || null;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInFormInputs>({
    resolver: yupResolver(signInSchema),
    mode: "onBlur",
  });

  const { data: wishlistProducts } = useGetWishlistQuery();

  const handleSuccessfulLogin = async (credentials: any) => {
    dispatch(setCredentials({ ...credentials }));

    if (wishlistProducts) {
      dispatch(setWishlist(wishlistProducts));
    }

    // Handle cart merging if needed
    if (userIntent === CheckoutIntent.NORMAL && localCartItems.length > 0) {
      const productsToAdd = localCartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      await mergeCarts(productsToAdd);
      dispatch(clearLocalcart());
    }

    dispatch(clearRedirectPath());
    if (from) {
      navigate(from);
    } else {
      navigate(-1);
    }
  };

  const onSubmit = async (data: SignInFormInputs) => {
    try {
      const response = await signIn(data).unwrap();
      await handleSuccessfulLogin(response);
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  return (
    <AuthForm
      onSubmit={handleSubmit(onSubmit)}
      isValid={isValid}
      isLoading={isLoading}
      submitText="Sign In"
      loadingText="Signing in.."
      signUpButton={
        <>
          <p className="mb-1 mt-2 text-center text-gray-600">Don&apos;t have an account yet?</p>
          <button
            type="button"
            onClick={() => navigate("/sign-up")}
            className="w-full rounded-lg bg-theme-orange py-2 font-semibold text-white transition duration-300 ease-in-out hover:bg-blue-700"
          >
            Create your electrozone account
          </button>
        </>
      }
    >
      <h4 className="text-lg font-semibold text-gray-800">Welcome,</h4>

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
        id="password"
        type="password"
        className={inputClasses}
        aria-required="true"
        required
      />
      {errors.password && <p className={errorMessageClasses}>{errors.password.message}</p>}
    </AuthForm>
  );
};
