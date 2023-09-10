import { CheckoutIntent } from "@/setup/slices/models";
import { RootState, store } from "@/setup/store";
import { checkHydration } from "@/utils/check-hydration";
import fetchNewAccessToken from "@/utils/fetch-access-token";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  useLoaderData,
  Await,
  defer,
  useNavigate,
  useLocation,
} from "react-router-dom";
import CheckoutProductCard from "./components/CheckoutProductCard";
import UserCard from "./components/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { clearbuyNowCart } from "@/setup/slices/buyNowCart-slice";
import { clearLocalcart } from "@/setup/slices/localCart-slice";
import { setUserIntent } from "@/setup/slices/user-slice";

const Checkout = () => {
  const { cartItems, user }: any = useLoaderData();
  const [showModal, setShowModal] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<any>(cartItems);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const userIntent = useSelector((state: RootState) => state.user.userIntent);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const previousLocation = useRef(location).current; // remember the previous location

  // useEffect(() => {
  //   // Check if user navigated back to the CheckoutPage from another page
  //   if (previousLocation.pathname !== location.pathname) {
  //     // Check if the user was redirected from the sign-in page
  //     if (previousLocation.pathname === "/sign-in") {
  //       // Redirect them to the my-cart route
  //       navigate("/my-cart");
  //     }
  //   }
  // }, [location, navigate, previousLocation]);

  function YourComponent() {
    useEffect(() => {
      return () => {
        window.addEventListener("beforeunload", () => console.log("hello"));
      };
    }, []);
  }

  const addToCartAndNavigate = async () => {
    const productsToOrder = checkoutItems.products.map((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    console.log("addToCartAndNavigate function is running");

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/carts/merge-carts`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(productsToOrder),
      }
    );

    if (response.ok) {
      console.log("merged");
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
    if (!accessToken) {
      await fetchNewAccessToken();
    }

    const productsToOrder = checkoutItems.products.map((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ orderItems: productsToOrder }),
    });

    if (response.status === 201) {
      const orderId = await response.json();
      let accessToken = store.getState().auth.accessToken;

      if (!accessToken) {
        accessToken = await fetchNewAccessToken();
      }

      await fetch(`${import.meta.env.VITE_API_URL}/carts/clear-cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      window.alert("order has been placed with ID:" + orderId);
      // dont forget to reset checkout intent
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
      navigate("my-cart");
    }
  };

  return (
    <>
      <button onClick={handleBackToHome}>Go Back to Your Cart</button>
      {showModal && (
        <div className="modal">
          <p>Do you want to add these items to your cart?</p>
          <button onClick={addToCartAndNavigate}>Yes, Add to Cart</button>
          <button onClick={justNavigate}>No, Thanks</button>
        </div>
      )}
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
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/carts/user-cart`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      await fetchNewAccessToken();
    }
  } else if (userIntent === CheckoutIntent.Instant) {
    const buyNowCart = state.buyNowCart;
    console.log(buyNowCart);
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/carts/buynow-cart`,
      {
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
      }
    );

    if (response.ok) {
      return await response.json();
    }
  } else {
    const localCart = state.localCart.items;
    const productsToOrder = localCart.map((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/carts/local-cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(productsToOrder),
      }
    );

    if (response.ok) {
      return await response.json();
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
