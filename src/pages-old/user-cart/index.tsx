import { Divider } from "@mui/material";
import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defer, LoaderFunctionArgs, redirect, useLoaderData, useNavigate } from "react-router-dom";

import { useFetch } from "@/hooks/use-fetch";
import { displayAlert } from "@/stores/slices/alert-slice";
import { clearLocalcart } from "@/stores/slices/local-cart-slice";
import { CheckoutIntent } from "@/stores/slices/models";
import { setUserIntent, updateCartItemCount } from "@/stores/slices/user-slice";
import { RootState, store } from "@/stores/store";
import { checkHydration } from "@/utils/check-hydration";
import { UnauthorizedError, loaderFetchProtected } from "@/utils/loader-fetch-protected";
import { ReactComponent as Bin } from "@assets/svgs/bin.svg";
import { ReactComponent as RightArrow } from "@assets/svgs/right-arrow.svg";

import { CartItemCard } from "./components/cart-item-card";

export const UserCart = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const { cart }: any = useLoaderData();
  console.log("cart in comp", cart);
  const [products, setProducts] = useState<any>(cart.cartItems);
  const [cartTotal, setCartTotal] = useState<any>(cart.cartTotal);
  const [totalQuantity] = useState<number>(cart.totalQuantity);

  const [refetchTrigger, setRefetchTrigger] = useState(false);
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const { fetchData } = useFetch();

  const handleCheckoutButton = () => {
    if (!isSignedIn) {
      dispatch(setUserIntent(CheckoutIntent.SESSION));
      navigate("/sign-in", { state: { from: { pathname: "/checkout" } } });
    } else {
      navigate("/checkout", { replace: true });
    }
  };

  const handleClearCartButton = async () => {
    if (!isSignedIn) {
      dispatch(clearLocalcart());
      setProducts([]);
      setCartTotal(0);
    } else {
      const result = await fetchData(
        `${import.meta.env.VITE_API_URL}/carts/clear-cart`,
        "DELETE",
        null,
        true,
      );

      if (result?.data.success === true) {
        setProducts([]);
        setCartTotal(0);
        dispatch(updateCartItemCount(0));
      }
    }
    dispatch(
      displayAlert({
        type: "info",
        message: "Your cart has been cleared",
        autoHide: true,
      }),
    );
  };

  // useEffect(() => {
  //   async function refetchCart() {
  //     const result = await RefetchCart(isSignedIn, fetchData);
  //     if (result?.response.ok) {
  //       setProducts(result.data.products);
  //       setCartTotal(result.data.cartTotal);
  //       setTotalQuantity(result.data.totalQuantity)
  //     }
  //   }
  //   refetchCart();
  // }, [refetchTrigger]);

  const triggerRefetch = () => {
    setRefetchTrigger(!refetchTrigger);
  };

  return (
    <div className="page-spacing">
      <h2 className="pb-2 text-lg font-bold md:text-xl">Your Shopping Cart</h2>
      <Suspense fallback={<p>Loading..</p>}>
        <div className="sm:flex sm:w-full sm:justify-between sm:space-x-4">
          {products.length === 0 ? (
            <p className="italic text-gray-500">There&apos;s nothing in your cart.</p>
          ) : (
            <>
              <div className="space-y-2 md:grow ">
                {products.map((product: any) => (
                  <CartItemCard
                    {...product}
                    onQuantityChange={triggerRefetch}
                    onRemoveItem={triggerRefetch}
                    onClearCart={triggerRefetch}
                    key={product.id}
                  />
                ))}
              </div>
              <div className="mt-4 flex h-fit rounded-md bg-gray-100 p-4 sm:mt-0 sm:max-w-6 md:max-w-10">
                <div className="flex w-full flex-col space-y-1 md:mr-4">
                  <p className="font-bold">Cart Summary: </p>
                  <Divider />
                  <div className="flex justify-between">
                    <p>Product Quantity:</p>
                    <p>{totalQuantity}</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Cart Total:</p>
                    <p>${Number(cartTotal).toFixed(2)}</p>
                  </div>
                  <Divider />

                  <div className="flex justify-around space-x-2 pt-2">
                    <button
                      onClick={handleClearCartButton}
                      className="flex items-center rounded-md bg-red-700 px-6 text-white transition duration-200 hover:bg-red-800"
                      disabled={products.length === 0}
                    >
                      <span>
                        <Bin className="h-auto w-6 fill-white" />
                      </span>
                      Clear Cart
                    </button>
                    <button
                      onClick={handleCheckoutButton}
                      className="flex items-center rounded-md bg-theme-blue px-3 py-[5px] text-white transition duration-200 hover:bg-blue-700"
                    >
                      <RightArrow className="h-auto w-6" />
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export const loader = async (request: LoaderFunctionArgs) => {
  await checkHydration(store);
  const state = store.getState();
  const isSignedIn = state.user.isSignedIn;

  if (!isSignedIn) {
    const cart = await fetch(`${import.meta.env.VITE_API_URL}/cart/session`, {
      credentials: "include",
    });

    if (cart.ok) {
      const data = await cart.json();
      console.log("data is ", data);
      return defer({ cart: data });
    } else {
      console.log("error");
    }
  } else {
    try {
      const cart = await loaderFetchProtected(
        `${import.meta.env.VITE_API_URL}/cart/user`,
        "GET",
        request.request,
      );

      return defer({ cart });
    } catch (error: unknown) {
      if (error instanceof UnauthorizedError) {
        return redirect("/sign-in");
      }
      throw error; // rethrow the error if it's not an UnauthorizedError
    }
  }
};
