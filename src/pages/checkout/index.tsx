import { Divider } from "@mui/material";
import { Suspense, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData, Await, defer, useNavigate, redirect } from "react-router-dom";

import { useFetch } from "@/hooks/use-fetch";
import { displayAlert } from "@/stores/slices/alert-slice";
import { clearbuyNowCart } from "@/stores/slices/buynow-cart-slice";
import { clearLocalcart } from "@/stores/slices/local-cart-slice";
import { CheckoutIntent } from "@/stores/slices/models";
import { setUserIntent } from "@/stores/slices/user-slice";
import { RootState, store } from "@/stores/store";
import { checkHydration } from "@/utils/check-hydration";
import { UnauthorizedError, loaderFetchProtected } from "@/utils/loader-fetch-protected";
import { ReactComponent as BrandIcon } from "@assets/brand-images/brand.svg";
import { ReactComponent as BackButton } from "@assets/svgs/backbutton.svg";

import { CheckoutProductCard } from "./components/checkout-product-card";
import { UserCard } from "./components/user-card";

type CheckoutProductCardProps = {
  id: number;
  productName: string;
  brand: string;
  thumbnail: string;
  quantity: number;
  price: number;
};

export const Checkout = () => {
  const { cartData, user }: any = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const [checkoutItems] = useState<any>(cartData);
  const userIntent = useSelector((state: RootState) => state.user.userIntent);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { fetchData, isLoading } = useFetch();

  const addToCartAndNavigate = async () => {
    const productsToOrder = checkoutItems.cartItems.map((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/carts/merge-carts`,
      "PATCH",
      productsToOrder,
      true,
    );

    if (result?.response.ok) {
      dispatch(clearbuyNowCart());
      dispatch(clearLocalcart());
      dispatch(setUserIntent(CheckoutIntent.NORMAL));
    }

    setShowModal(false);
    navigate("/my-cart");
  };

  const justNavigate = () => {
    navigate("/my-cart");
    setShowModal(false);
  };

  const handleOrderPlacement = async () => {
    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/order/process-order`,
      "POST",
      null,
      true,
      true,
    );

    if (result?.response.ok) {
      const orderId = result.data;
      dispatch(
        displayAlert({
          type: "success",
          message: `Your order with ${orderId} has been successfully placed`,
          autoHide: true,
        }),
      );
      if (userIntent !== CheckoutIntent.NORMAL) {
        dispatch(setUserIntent(CheckoutIntent.NORMAL));
      }

      navigate("/order-success", { state: { orderId } });
    }
  };

  const handleBackToHome = async () => {
    if (userIntent === CheckoutIntent.SESSION) {
      dispatch(setUserIntent(CheckoutIntent.NORMAL));
      addToCartAndNavigate();
    } else if (userIntent === CheckoutIntent.BUY_NOW) {
      dispatch(setUserIntent(CheckoutIntent.NORMAL));
      setShowModal(true);
    } else {
      navigate("/my-cart");
    }
  };

  return (
    <div className="bg-gray-100 ">
      <div className="mx-auto max-w-screen-xl bg-white px-2 py-4">
        <button onClick={handleBackToHome} className="mb-6 w-full">
          <BrandIcon className="h-auto w-72 rounded-lg shadow-md transition-transform hover:scale-105" />
        </button>

        {showModal && (
          <div className="fixed left-0 top-0 z-50 flex size-full items-center justify-center">
            <div className="rounded-xl bg-white p-8 shadow-lg">
              <p className="mb-4 text-lg">Do you want to add these items to your cart?</p>
              <div className="flex space-x-4">
                <button
                  onClick={addToCartAndNavigate}
                  className="rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                >
                  Yes, Add to Cart
                </button>
                <button
                  onClick={justNavigate}
                  className="rounded-md bg-gray-300 px-4 py-2 text-black transition-colors hover:bg-gray-400"
                >
                  No, Thanks
                </button>
              </div>
            </div>
          </div>
        )}
        <Divider flexItem />
        <button onClick={handleBackToHome} className="block  rounded-md py-2 hover:bg-gray-200">
          <BackButton className="mr-2 inline h-auto w-7" />
          Go back
        </button>
        <Divider flexItem />

        <div className="mt-2 flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2">
          <div className="max-w-screen-md grow">
            <Suspense fallback={<p>Loading...</p>}>
              <Await resolve={user}>
                <UserCard
                  firstName={user.firstName}
                  lastName={user.lastName}
                  email={user.email}
                  address={user.address}
                  city={user.city}
                />
              </Await>
              <div className="mt-6 max-w-screen-md grow space-y-4">
                {checkoutItems.cartItems.map((product: CheckoutProductCardProps) => {
                  return (
                    <CheckoutProductCard
                      key={product.id}
                      id={product.id}
                      productName={product.productName}
                      brand={product.brand}
                      thumbnail={product.thumbnail}
                      price={product.price}
                      quantity={product.quantity}
                    />
                  );
                })}
              </div>
            </Suspense>
          </div>
          <div className="mt-4 flex min-w-[300px] flex-1 flex-col rounded-md bg-white p-4 font-[500] shadow-md md:ml-5 md:mt-0 md:max-w-sm">
            <h4 className="text-lg leading-8 underline">Order Summary:</h4>
            <table>
              <tbody className="[&_tr]:leading-8">
                <tr>
                  <td>Total Quantity: </td>
                  <td className="text-right">{cartData.totalQuantity}</td>
                </tr>
                <tr>
                  <td>Shipping:</td>
                  <td className="text-right font-normal italic">Free Shipping</td>
                </tr>
                <tr>
                  <td>Products: </td>
                  <td className="text-right">${cartData.cartTotal}</td>
                </tr>
                <tr>
                  <td>
                    <Divider />
                  </td>
                </tr>
                <tr className="text-lg text-black [&_td]:pt-3">
                  <td>Total:</td>
                  <td className="text-right">${cartData.cartTotal}</td>
                </tr>
              </tbody>
            </table>

            <button
              onClick={handleOrderPlacement}
              className={`${
                isLoading("default") ? "bg-[gray-300]" : "bg-theme-orange hover:bg-orange-400"
              }  mt-2 flex rounded-md px-6 py-2 text-white shadow-md transition-colors`}
              disabled={isLoading("default")}
            >
              <p className="mx-auto">
                {isLoading("default") ? "Placing order.." : "Confirm Order"}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

async function getCartInfo(request: any) {
  await checkHydration(store);
  const state = store.getState();
  const userIntent = state.user.userIntent;

  return await loaderFetchProtected(
    `${import.meta.env.VITE_API_URL}/order/initiate-checkout`,
    "POST",
    request,
    { checkoutType: userIntent },
    true,
  );
}

async function getUserInfo(request: any) {
  await checkHydration(store);
  return await loaderFetchProtected(`${import.meta.env.VITE_API_URL}/user/profile`, "GET", request);
}

export async function loader({ request }: any) {
  try {
    const cartData = await getCartInfo(request);
    const user = await getUserInfo(request);

    return defer({
      cartData,
      user,
    });
  } catch (error: unknown) {
    if (error instanceof UnauthorizedError) {
      return redirect("/sign-in");
    }
    throw error; // rethrow the error if it's not an UnauthorizedError
  }
}
