import { RootState, store } from "@/setup/store";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defer, redirect, useLoaderData, useNavigate } from "react-router-dom";
import CartItemCard from "./components/CartItemCard";
import { setUserIntent, updateCartItemCount } from "@/setup/slices/user-slice";
import { CheckoutIntent } from "@/setup/slices/models";
import { checkHydration } from "@/utils/check-hydration";
import { clearLocalcart } from "@/setup/slices/localCart-slice";
import useFetch from "@/common/Hooks/use-fetch";
import { displayAlert } from "@/setup/slices/alert-slice";
import loaderFetch from "@/utils/loader-fetch";
import {
  UnauthorizedError,
  loaderFetchProtected,
} from "@/utils/loader-fetch-protected";

const RefetchCart = (isSignedIn: boolean, fetchData: any) => {
  const productsInLocalCart = store
    .getState()
    .localCart.items.map((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

  const endpoint = isSignedIn
    ? `${import.meta.env.VITE_API_URL}/carts/user-cart`
    : `${import.meta.env.VITE_API_URL}/carts/local-cart`;
  const method = isSignedIn ? "GET" : "POST";
  const body = isSignedIn ? null : productsInLocalCart;

  return fetchData(endpoint, method, body, true);
};

const UserCart = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const { cart }: any = useLoaderData();
  const [products, setProducts] = useState<any>(cart.products);
  const [cartTotal, setCartTotal] = useState<any>(cart.cartTotal);

  const [refetchTrigger, setRefetchTrigger] = useState(false);
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const { fetchData } = useFetch();

  const handleCheckoutButton = () => {
    if (!isSignedIn) {
      dispatch(setUserIntent(CheckoutIntent.Local));
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
        true
      );

      if (result?.data.success === true) {
        setProducts([]);
        setCartTotal(0);
        dispatch(updateCartItemCount(0))
      }
    }
    dispatch(
      displayAlert({
        type: "success",
        message: "Your cart has been cleared",
        autoHide: true,
      })
    );
  };

  useEffect(() => {
    async function refetchCart() {
      const result = await RefetchCart(isSignedIn, fetchData);
      if (result?.response.ok) {
        setProducts(result.data.products);
        setCartTotal(result.data.cartTotal);
      }
    }
    refetchCart();
  }, [refetchTrigger]);

  const triggerRefetch = () => {
    setRefetchTrigger(!refetchTrigger);
  };

  return (
    <div className="max-w-screen-lg space-y-8 my-[2%] mx-[1%]">
      <h2 className="text-2xl font-semibold text-gray-700">
        Your Shopping Cart
      </h2>
      <Suspense fallback={<p className="text-gray-600">Loading..</p>}>
        <div>
          {products.length === 0 ? (
            <p className="text-gray-500 italic">
              There's nothing in your cart.
            </p>
          ) : (
            <>
              <div className="space-y-4">
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
              <div>
                <p className="text-xl text-gray-700 font-semibold mt-4">
                  Cart Total: ${cartTotal.toFixed(2)}
                </p>

                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={handleCheckoutButton}
                    className="bg-theme-blue hover:bg-blue-600 text-white px-4 py-2 rounded-md transition duration-200"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={handleClearCartButton}
                    className="bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-md transition duration-200"
                    disabled={products.length === 0}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default UserCart;

export const loader = async (request: any) => {
  await checkHydration(store);
  const state = store.getState();
  const isSignedIn = state.user.isSignedIn;

  if (!isSignedIn) {
    const localCart = state.localCart.items;
    const productsToOrder = localCart.map((item: any) => {
      return {
        productId: item.id,
        quantity: item.quantity,
      };
    });

    const cart = await loaderFetch(
      `${import.meta.env.VITE_API_URL}/carts/local-cart`,
      "POST",
      productsToOrder
    );

    return defer({ cart: cart.data });
  } else {
    try {
      const cart = await loaderFetchProtected(
        `${import.meta.env.VITE_API_URL}/carts/user-cart`,
        "GET",
        request.request
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
