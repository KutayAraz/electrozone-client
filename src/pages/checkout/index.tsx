import { CheckoutIntent } from "@/setup/slices/models";
import { RootState, store } from "@/setup/store";
import { checkHydration } from "@/utils/check-hydration";
import fetchNewAccessToken from "@/utils/renew-token";
import { Suspense, useState } from "react";
import { useLoaderData, Await, defer, useNavigate } from "react-router-dom";
import CheckoutProductCard from "./components/CheckoutProductCard";
import UserCard from "./components/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { clearbuyNowCart } from "@/setup/slices/buyNowCart-slice";
import { clearLocalcart } from "@/setup/slices/localCart-slice";
import { setUserIntent } from "@/setup/slices/user-slice";
import { ReactComponent as BrandIcon } from "@assets/brand/brand.svg";
import { ReactComponent as BackButton } from "@assets/svg/backbutton.svg";
import loaderFetch from "@/utils/loader-fetch";
import useFetch from "@/common/Hooks/use-fetch";
import { displayAlert } from "@/setup/slices/alert-slice";

const Checkout = () => {
  const { cartItems, user }: any = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<any>(cartItems);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const userIntent = useSelector((state: RootState) => state.user.userIntent);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { fetchData } = useFetch();

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
      productsToOrder,
      true
    );

    if (result?.response.ok) {
      const orderId = await result.data.json();
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
    <div className="min-h-screen bg-gray-100 p-6">
      <button onClick={handleBackToHome} className="mb-6">
        <BrandIcon className="w-64 h-auto rounded-lg shadow-md transition-transform transform hover:scale-105" />
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
      <button onClick={handleBackToHome} className="block mb-2">
        <BackButton className="w-[2rem] h-auto inline" />
        Go back
      </button>
      <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={user}
          children={(user) => (
            <UserCard
              firstName={user.firstName}
              lastName={user.lastName}
              address={user.address}
              city={user.city}
            />
          )}
        />
        <div className="space-y-4 mt-6">
          {checkoutItems.products.map((product: any) => {
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
      <button
        onClick={handleOrderPlacement}
        className="bg-theme-orange text-white px-6 py-2 mt-8 rounded-md shadow-md hover:bg-orange-400 transition-colors"
      >
        Confirm Order
      </button>
    </div>
  );
};

export default Checkout;

async function getCartInfo() {
  await checkHydration(store);
  const state = store.getState();
  const userIntent = state.user.userIntent;

  // if (userIntent === CheckoutIntent.Normal) {
  //   const response = await fetch(
  //     `${import.meta.env.VITE_API_URL}/carts/user-cart`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     }
  //   );

  //   if (response.ok) {
  //     return await response.json();
  //   } else if (response.status === 401) {
  //     await fetchNewAccessToken();
  //   }
  // } else if (userIntent === CheckoutIntent.Instant) {
  //   const buyNowCart = state.buyNowCart;
  //   console.log(buyNowCart);
    
  //   const response = await fetch(
  //     `${import.meta.env.VITE_API_URL}/carts/buynow-cart`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       body: JSON.stringify({
  //         productId: buyNowCart.productId,
  //         quantity: buyNowCart.quantity,
  //       }),
  //     }
  //   );

  //   if (response.ok) {
  //     return await response.json();
  //   }
  // } else {
  //   const localCart = state.localCart.items;
  //   const productsToOrder = localCart.map((item: any) => ({
  //     productId: item.id,
  //     quantity: item.quantity,
  //   }));
  //   const response = await fetch(
  //     `${import.meta.env.VITE_API_URL}/carts/local-cart`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Accept: "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //       body: JSON.stringify(productsToOrder),
  //     }
  //   );

  //   if (response.ok) {
  //     return await response.json();
  //   }
  // }
}

async function getUserInfo() {
  await checkHydration(store);
  const state = store.getState();
  let accessToken = state.auth.accessToken;
  if (!accessToken) {
    accessToken = await fetchNewAccessToken();
  }

  const result = await loaderFetch(
    `${import.meta.env.VITE_API_URL}/user/profile`,
    "GET",
    null,
    true
  );

  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    return await response.json();
  } else {
    throw new Error("Failed to fetch user info");
  }
}

export async function loader() {
  return defer({
    cartItems: await getCartInfo(),
    user: await getUserInfo(),
  });
}
