import { useFetch } from "@/hooks";
import { setAccessToken } from "@/stores/slices/auth-slice";
import { clearLocalcart } from "@/stores/slices/local-cart-slice";
import { CheckoutIntent } from "@/stores/slices/models";
import { clearRedirectPath } from "@/stores/slices/redirect-slice";
import { setCredentials } from "@/stores/slices/user-slice";
import { setWishlist } from "@/stores/slices/wishlist-slice";
import { RootState, store } from "@/stores/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { CircularProgress } from "@mui/material";
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

export const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = useSelector((state: RootState) => state.redirect.path);
  const from = location.state?.from || redirectPath || null;

  const { fetchData, isLoading } = useFetch();

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

    const wishlistProducts = await fetchData(
      `${import.meta.env.VITE_API_URL}/user/wishlist`,
      "GET",
      null,
      true
    );

    if (wishlistProducts?.response.ok) {
      const productIds = wishlistProducts.data.map((product: any) => product.id);
      dispatch(setWishlist(productIds))
    }

    if (
      store.getState().user.userIntent === CheckoutIntent.NORMAL &&
      store.getState().localCart.items.length > 0
    ) {
      await mergeCartsAndNavigate();
    }

    dispatch(clearRedirectPath());
    if (from) {
      navigate(from);
    } else {
      navigate(-1);
    }
  };

  const loginRequest = async (data: SignInFormInputs) => {
    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/auth/signin`,
      "POST",
      { email: data.email, password: data.password },
      true,
      true
    );

    if (result?.response.ok) {
      await handleSuccessfulLogin(result.data);
    }
  };

  const inputClasses =
    "border-2 border-gray-300 rounded-md px-4 py-2 mt-1 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none transition duration-300";
  const labelClasses = "text-gray-600 mt-2";
  const errorMessageClasses = "text-red-500 text-sm mt-1";

  return (
    <form action="POST" onSubmit={handleSubmit(loginRequest)}>
      <div className="flex flex-col max-w-md mx-2 xs:mx-auto p-6 bg-white shadow-md rounded-xl mb-4">
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
        {errors.email && (
          <p className={errorMessageClasses}>{errors.email.message}</p>
        )}

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
        {errors.password && (
          <p className={errorMessageClasses}>{errors.password.message}</p>
        )}

        <button
          type="submit"
          aria-label="Sign in"
          className={`w-full rounded-lg mt-4 py-2 text-white font-semibold ${isValid ? "bg-theme-blue hover:bg-blue-700" : "bg-gray-400"
            } transition duration-300 ease-in-out`}
          disabled={!isValid || isLoading("default")}
        >
          {isLoading("default") ? (
            <div className="flex justify-center">
              <CircularProgress
                style={{ width: "1.25rem", height: "1.25rem" }}
                sx={{ color: "#13193F" }}
                className="mr-2 "
              />
              <p>Signing in..</p>
            </div>
          ) : (
            "Sign In"
          )}
        </button>

        <p className="text-gray-600 mt-4 mb-1 text-center">
          Don't have an account yet?
        </p>

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
