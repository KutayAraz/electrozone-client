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
import { Divider } from "@mui/material";
import { ReactComponent as Bin } from "@assets/svg/bin.svg";
import { ReactComponent as RightArrow } from "@assets/svg/right-arrow.svg";

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
        type: "info",
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
    <div className="page-spacing">
      <h2 className="text-lg md:text-xl font-bold py-2">
        Your Shopping Cart
      </h2>
      <Suspense fallback={<p>Loading..</p>}>
        <div className="sm:flex sm:w-full sm:justify-between">
          {products.length === 0 ? (
            <p className="text-gray-500 italic">
              There's nothing in your cart.
            </p>
          ) : (
            <>
              <div className="space-y-2 md:flex-grow md:mr-6">
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
              <div className="flex mt-4 w-full">
                <div className="flex flex-col space-y-1 w-full">
                  <p className="font-bold">Cart Summary: </p>
                  <Divider />
                  <div className="flex justify-between">
                    <p>
                      Product Quantity:
                    </p>
                    <p>
                      {cart.totalQuantity}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p>
                      Cart Total:
                    </p>
                    <p>
                      ${cartTotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex space-x-2 pt-2 justify-around">
                    <button
                      onClick={handleCheckoutButton}
                      className="bg-theme-blue hover:bg-blue-700 text-white px-3 py-[5px] rounded-md transition duration-200 flex items-center"
                    >
                      <RightArrow className="w-6 h-auto" />

                      Proceed to Checkout
                    </button>
                    <button
                      onClick={handleClearCartButton}
                      className="bg-red-700 hover:bg-red-800 text-white px-6 rounded-md transition duration-200 flex items-center"
                      disabled={products.length === 0}
                    >
                      <span>
                        <Bin className="w-6 h-auto fill-white" />
                      </span>
                      Clear Cart
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
