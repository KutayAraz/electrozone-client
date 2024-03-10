import { CheckoutIntent } from "@/setup/slices/models";
import { RootState, store } from "@/setup/store";
import { checkHydration } from "@/utils/check-hydration";
import { Suspense, useState } from "react";
import {
  useLoaderData,
  Await,
  defer,
  useNavigate,
  redirect,
} from "react-router-dom";
import CheckoutProductCard from "./components/CheckoutProductCard";
import UserCard from "./components/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { clearbuyNowCart } from "@/setup/slices/buyNowCart-slice";
import { clearLocalcart } from "@/setup/slices/localCart-slice";
import { setUserIntent } from "@/setup/slices/user-slice";
import { ReactComponent as BrandIcon } from "@assets/brand/brand.svg";
import { ReactComponent as BackButton } from "@assets/svg/backbutton.svg";
import useFetch from "@/common/Hooks/use-fetch";
import { displayAlert } from "@/setup/slices/alert-slice";
import {
  UnauthorizedError,
  loaderFetchProtected,
} from "@/utils/loader-fetch-protected";
import { Divider } from "@mui/material";

const Checkout = () => {
  const { cartData, user }: any = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<any>(cartData);
  const userIntent = useSelector((state: RootState) => state.user.userIntent);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { fetchData, isLoading } = useFetch();

  const addToCartAndNavigate = async () => {
    const productsToOrder = checkoutItems.products.map((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/carts/merge-carts`,
      "PATCH",
      productsToOrder,
      true
    );

    if (result?.response.ok) {
      dispatch(clearbuyNowCart());
      dispatch(clearLocalcart());
      dispatch(setUserIntent(CheckoutIntent.Normal));
    }

    setShowModal(false);
    navigate("/my-cart");
  };

  const justNavigate = () => {
    navigate("/my-cart");
    setShowModal(false);
  };

  const handleOrderPlacement = async () => {
    const productsToOrder = checkoutItems.products.map((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/orders`,
      "POST",
      { orderItems: productsToOrder },
      true,
      false
    );

    if (result?.response.ok) {
      const orderId = result.data;
      dispatch(
        displayAlert({
          type: "success",
          message: `Your order with ${orderId} has been successfully placed`,
          autoHide: true,
        })
      );
      if (userIntent !== CheckoutIntent.Normal) {
        dispatch(setUserIntent(CheckoutIntent.Normal));
      }

      navigate("/order-success", { state: { orderId } });
    }
  };

  const handleBackToHome = async () => {
    if (userIntent === CheckoutIntent.Local) {
      dispatch(setUserIntent(CheckoutIntent.Normal));
      addToCartAndNavigate();
    } else if (userIntent === CheckoutIntent.Instant) {
      dispatch(setUserIntent(CheckoutIntent.Normal));
      setShowModal(true);
    } else {
      navigate("/my-cart");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className="page-spacing">

        <div className="max-w-screen-xl mx-auto">
          <button onClick={handleBackToHome} className="mb-6 w-full">
            <BrandIcon className="w-72 h-auto rounded-lg shadow-md transition-transform transform hover:scale-105" />
          </button>

          {showModal && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <p className="mb-4 text-lg">
                  Do you want to add these items to your cart?
                </p>
                <div className="flex space-x-4">
                  <button
                    onClick={addToCartAndNavigate}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Yes, Add to Cart
                  </button>
                  <button
                    onClick={justNavigate}
                    className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    No, Thanks
                  </button>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={handleBackToHome}
            className="block mb-2 hover:bg-gray-200 rounded-md py-2"
          >
            <BackButton className="w-[1.75rem] mr-2 h-auto inline" />
            Go back
          </button>
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="max-w-screen-md flex-grow">
              <Suspense fallback={<p>Loading...</p>}>
                <Await
                  resolve={user}
                  children={(user) => (
                    <UserCard
                      firstName={user.firstName}
                      lastName={user.lastName}
                      email={user.email}
                      address={user.address}
                      city={user.city}
                    />
                  )}
                />
                <div className="space-y-4 mt-6 max-w-screen-md flex-grow">
                  {checkoutItems.products.map(
                    (product: CheckoutProductCardProps) => {
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
                    }
                  )}
                </div>
              </Suspense>
            </div>
            <div className="flex flex-col flex-1 bg-white px-4 py-4 rounded-md shadow-md font-[500] mt-4 md:mt-0 md:ml-5 md:max-w-sm min-w-[300px]">
              <h4 className="text-lg underline leading-8">Order Summary:</h4>
              <table>
                <tbody className="[&_tr]:leading-8">
                  <tr>
                    <td>Total Quantity: </td>
                    <td className="text-right">{cartData.totalQuantity}</td>
                  </tr>
                  <tr>
                    <td>Shipping:</td>
                    <td className="italic font-normal text-right">
                      Free Shipping
                    </td>
                  </tr>
                  <tr>
                    <td>Products: </td>
                    <td className="text-right">${cartData.cartTotal}</td>
                  </tr>
                  <tr>
                    <td><Divider /></td>
                  </tr>
                  <tr className="text-black text-xl [&_td]:pt-3">
                    <td>Total:</td>
                    <td className="text-right">${cartData.cartTotal}</td>
                  </tr>
                </tbody>
              </table>

              <button
                onClick={handleOrderPlacement}
                className={`${isLoading("default")
                  ? "bg-[gray-300]"
                  : "bg-theme-orange hover:bg-orange-400"
                  }  text-white px-6 py-2 mt-2 rounded-md shadow-md transition-colors flex`}
                disabled={isLoading("default")}
              >
                <p className="mx-auto">{isLoading("default") ? "Placing order.." : "Confirm Order"}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

async function getCartInfo(request: any) {
  await checkHydration(store);
  const state = store.getState();
  const userIntent = state.user.userIntent;

  if (userIntent === CheckoutIntent.Normal) {
    return await loaderFetchProtected(
      `${import.meta.env.VITE_API_URL}/carts/user-cart`,
      "GET",
      request
    );
  } else if (userIntent === CheckoutIntent.Instant) {
    const buyNowCart = state.buyNowCart;
    return await loaderFetchProtected(
      `${import.meta.env.VITE_API_URL}/carts/buynow-cart`,
      "POST",
      request,
      {
        productId: buyNowCart.productId,
        quantity: buyNowCart.quantity,
      }
    );
  } else {
    const localCart = state.localCart.items;
    const productsToOrder = localCart.map((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    return await loaderFetchProtected(
      `${import.meta.env.VITE_API_URL}/carts/local-cart`,
      "POST",
      request,
      productsToOrder
    );
  }
}

async function getUserInfo(request: any) {
  await checkHydration(store);
  return await loaderFetchProtected(
    `${import.meta.env.VITE_API_URL}/user/profile`,
    "GET",
    request
  );
}

export async function loader({ request }: any) {
  try {
    const cartData = await getCartInfo(request);
    if (cartData.products.length === 0) {
      return redirect("/my-cart");
    }
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
