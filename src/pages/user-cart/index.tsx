import { RootState, store } from "@/setup/store";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { defer, useLoaderData, useNavigate } from "react-router-dom";
import CartItemCard from "./components/CartItemCard";
import { setUserIntent } from "@/setup/slices/user-slice";
import { CheckoutIntent } from "@/setup/slices/models";
import { checkHydration } from "@/utils/check-hydration";
import fetchNewAccessToken from "@/utils/fetch-access-token";

const UserCart = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const {cart}: any = useLoaderData();
  const [cartData, setCartData] = useState<any>(cart);
  const [refetchTrigger, setRefetchTrigger] = useState(false);

  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);

  const handleCheckoutButton = () => {
    if (!isSignedIn) {
      dispatch(setUserIntent(CheckoutIntent.Local));
      navigate("/sign-in");
    } else {
      navigate("/checkout");
    }
  };

  useEffect(() => {
    async function refetchCart() {
      if (!isSignedIn) {
        const productsInLocalCart = store
          .getState()
          .localCart.items.map((item: any) => ({
            productId: item.id,
            quantity: item.quantity,
          }));
        console.log(productsInLocalCart);
        try {
          const data = await fetch("http://localhost:3000/carts/local-cart", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(productsInLocalCart),
          });
          const fetchedCartData = await data.json();
          setCartData(fetchedCartData);
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        }
      }
    }
    refetchCart();
  }, [refetchTrigger]);

  const triggerRefetch = () => {
    setRefetchTrigger(!refetchTrigger);
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      <h2>Your Shopping Cart</h2>
      <Suspense fallback={<p>Loading..</p>}>
        <div>
          <>
            {cartData.products.map((product: any) => {
              const productDetails = product.product;
              return (
                <CartItemCard
                  key={productDetails.id}
                  id={productDetails.id}
                  productName={productDetails.productName}
                  thumbnail={productDetails.thumbnail}
                  price={productDetails.price}
                  quantity={product.quantity}
                  totalPrice={product.totalPrice}
                  onQuantityChange={triggerRefetch}
                  onRemoveItem={triggerRefetch}
                />
              );
            })}
            <p>{cartData.cartTotal}</p>
            <button onClick={handleCheckoutButton}>Proceed to Checkout</button>
          </>
        </div>
      </Suspense>
    </div>
  );
};

export default UserCart;

async function loadCart() {
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

    const response = await fetch("http://localhost:3000/carts/local-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(productsToOrder),
    });

    if (response.status === 201) {
      return await response.json();
    } else {
      throw new Error("Failed to fetch local cart");
    }
  }

  let accessToken = state.auth.accessToken;

  if (!accessToken) {
    accessToken = await fetchNewAccessToken();
  }

  return await fetchUserCart(accessToken);
}

async function fetchUserCart(accessToken: any): Promise<any> {
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
  }
}

export async function loader() {
  return defer({
    cart: await loadCart(),
  });
}
