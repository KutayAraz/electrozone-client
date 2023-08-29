import { RootState, store } from "@/setup/store";
import { ChangeEvent, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Await,
  Link,
  defer,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import CartItemCard from "./components/CartItemCard";
import { checkHydration } from "@/utils/check-hydration";
import fetchNewAccessToken from "@/utils/fetch-access-token";

const UserCart = () => {
  const cart: any = useSelector<any>((state) => state.localCart.quantity);
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const { cartItems }: any = useLoaderData();

  const handleCheckoutButton = () => {
    if (!isSignedIn) navigate("/checkout");
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <h2>Your Shopping Cart</h2>

      <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={cartItems}
          children={(cartItems) => (
            <>
              {cartItems.products.map((product: any) => (
                <CartItemCard
                  key={product.id}
                  id={product.id}
                  productName={product.productName}
                  thumbnail={product.thumbnail}
                  price={product.price}
                  quantity={product.quantity}
                  totalPrice={product.totalPrice}
                />
              ))}
              <p>{cartItems.cartTotal}</p>
              <button onClick={handleCheckoutButton}>
                Proceed to Checkout
              </button>
            </>
          )}
        />
      </Suspense>
    </div>
  );
};

export default UserCart;

async function loadCart() {
  await checkHydration(store);
  const state = store.getState();
  const isSignedIn = state.user.firstName;

  if (!isSignedIn) {
    const localCartItems = state.localCart.items;
    const items = localCartItems.map((item: any) => item);
    const response = await fetch("http://localhost:3000/carts/local-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(items),
    });

    if (response.status === 201) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch local cart");
    }
  }

  let accessToken = state.auth.accessToken;

  const response = await fetchUserCart(accessToken);

  if (response.status === 200) {
    return await response.json();
  } else if (response.status === 401) {
    const newToken = await fetchNewAccessToken();
    if (newToken) {
      const resp = await fetchUserCart(newToken);
      return await resp.json();
    }
  } else {
    throw new Error("Failed to fetch user cart");
  }
}

async function fetchUserCart(accessToken: any) {
  return await fetch("http://localhost:3000/carts/user-cart", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function loader() {
  return defer({
    cartItems: loadCart(),
  });
}
