import { RootState, store } from "@/setup/store";
import { ChangeEvent, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Await, Link, defer, useLoaderData } from "react-router-dom";
import CartItemCard from "./components/CartItemCard";

const UserCart = () => {
  const cart: any = useSelector<any>((state) => state.localCart.quantity);
  const dispatch: any = useDispatch();
  const { cartItems }: any = useLoaderData();

  return (
    <div className="max-w-screen-lg mx-auto">
      <h2>Your Shopping Cart</h2>

      <Suspense fallback={<p>Loading...</p>}>
        <Await
          resolve={cartItems}
          children={(cartItems) => (
            <>
              {cartItems.localCartProducts.map((product: any) => (
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
              <button>Proceed to Checkout</button>
            </>
          )}
        />
      </Suspense>
    </div>
  );
};

export default UserCart;

async function loadCart() {
  const state = store.getState();
  const isSignedIn = state.user.firstName;

  console.log("isSignedIn", isSignedIn);

  if (!isSignedIn) {
    const localCartItems = state.localCart.items;
    const items = localCartItems.map((item: any) => item);
    console.log(items);
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

  const accessToken = state.auth.accessToken;

  const response = await fetch("http://localhost:3000/carts/user-cart", {
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
    throw new Error("Failed to fetch user cart");
  }
}

export function loader() {
  return defer({
    cartItems: loadCart(),
  });
}
