import { CheckoutIntent } from "@/setup/slices/models";
import { RootState, store } from "@/setup/store";
import { checkHydration } from "@/utils/check-hydration";
import fetchNewAccessToken from "@/utils/fetch-access-token";
import { Suspense, useEffect, useState } from "react";
import { useLoaderData, Await, defer, useNavigate } from "react-router-dom";
import CheckoutProductCard from "./components/CheckoutProductCard";
import UserCard from "./components/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { clearbuyNowCart } from "@/setup/slices/buyNowCart-slice";

const Checkout = () => {
  const { cartItems, user }: any = useLoaderData();

  const [checkoutItems, setCheckoutItems] = useState<any>(cartItems);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const userIntent = useSelector((state: RootState) => state.user.userIntent);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("hello")

  const handleOrderPlacement = async () => {
    if (!accessToken) {
      await fetchNewAccessToken();
    }

    console.log(checkoutItems);

    const productsToOrder = checkoutItems.products.map((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const response = await fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ orderItems: productsToOrder }),
    });

    if (response.status === 201) {
      console.log("order has been placed");
    }
  };

  const handleBackToHome = async () => {
    if (
      userIntent === CheckoutIntent.Instant ||
      userIntent === CheckoutIntent.Local
    ) {
      const productsToOrder = checkoutItems.products.map((item: any) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      console.log(productsToOrder);
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ cartItems: productsToOrder }),
      });

      if (response.status === 201) {
        console.log("merged");
        dispatch(clearbuyNowCart());
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <button onClick={handleBackToHome}>Go Back to Home Page</button>
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
        <>
          {checkoutItems.products.map((productItem: any) => {
            const productDetails = productItem.product;
            return (
              <CheckoutProductCard
                key={productDetails.id}
                productName={productDetails.productName}
                brand={productDetails.brand}
                thumbnail={productDetails.thumbnail}
                price={productDetails.price}
                quantity={productItem.quantity}
              />
            );
          })}
        </>
      </Suspense>
      <button onClick={handleOrderPlacement}>Confirm Order</button>
    </>
  );
};

export default Checkout;

async function getCartInfo() {
  await checkHydration(store);
  const state = store.getState();
  const userIntent = state.user.userIntent;
  console.log(userIntent);
  let accessToken = state.auth.accessToken;
  if (!accessToken) {
    accessToken = await fetchNewAccessToken();
  }

  if (userIntent === CheckoutIntent.Normal) {
    const response = await fetch("http://localhost:3000/carts/user-cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      return data;
    } else if (response.status === 401) {
      await fetchNewAccessToken();
    }
  } else if (userIntent === CheckoutIntent.Instant) {
    const buyNowCart = state.buyNowCart;
    const response = await fetch("http://localhost:3000/carts/buynow-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        productId: buyNowCart.productId,
        quantity: buyNowCart.quantity,
      }),
    });

    if (response.status === 201) {
      const data = await response.json();
      console.log(data);
      return data;
    }
  } else {
    const localCart = state.localCart.items;
    const productsToOrder = localCart.map((item: any) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));
    const response = await fetch("http://localhost:3000/carts/buynow-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(productsToOrder),
    });

    if (response.status === 200) {
      const data = await response.json();
      return [data];
    }
  }
}

async function getUserInfo() {
  await checkHydration(store);
  const state = store.getState();
  let accessToken = state.auth.accessToken;
  if (!accessToken) {
    accessToken = await fetchNewAccessToken();
  }

  const response = await fetch("http://localhost:3000/user/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.status === 200) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    throw new Error("Failed to fetch user info");
  }
}

export async function loader() {
  return defer ({
    cartItems: await getCartInfo(),
    user: await getUserInfo(),
  });
}
