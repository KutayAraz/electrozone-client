import { RootState, store } from "@/setup/store";
import { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  defer,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import CartItemCard from "./components/CartItemCard";
import { setUserIntent } from "@/setup/slices/user-slice";
import { CheckoutIntent } from "@/setup/slices/models";
import { checkHydration } from "@/utils/check-hydration";
import fetchNewAccessToken from "@/utils/renew-token";
import { clearLocalcart } from "@/setup/slices/localCart-slice";

const UserCart = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const { cart }: any = useLoaderData();
  const [cartData, setCartData] = useState<any>(cart);
  const [refetchTrigger, setRefetchTrigger] = useState(false);
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);

  const handleCheckoutButton = () => {
    if (!isSignedIn) {
      dispatch(setUserIntent(CheckoutIntent.Local));
      navigate("/sign-in", { state: { from: { pathname: "/checkout" } } });
    } else if (cartData.products.length === 0) {
      window.alert("your cart is empty");
      return null;
    } else {
      navigate("/checkout", { replace: true });
    }
  };

  const handleClearCartButton = async () => {
    if (!isSignedIn) {
      dispatch(clearLocalcart());
      setCartData([]);
    } else {
      let accessToken = store.getState().auth.accessToken;

      if (!accessToken) {
        accessToken = await fetchNewAccessToken();
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/carts/clear-cart`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        setCartData([]);
      }
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
        try {
          const data = await fetch(
            `${import.meta.env.VITE_API_URL}/carts/local-cart`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify(productsInLocalCart),
            }
          );

          if (data.ok) {
            const fetchedCartData = await data.json();
            setCartData(fetchedCartData);
          }
        } catch (error) {
          console.error("Failed to fetch cart:", error);
        }
      } else {
        let accessToken = store.getState().auth.accessToken;

        if (!accessToken) {
          accessToken = await fetchNewAccessToken();
        }

        try {
          const data = await fetch(
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

          if (data.ok) {
            const fetchedCartData = await data.json();
            setCartData(fetchedCartData);
          }
        } catch (error) {
          console.error("Failed to fetch  usercart:", error);
        }
      }
    }
    refetchCart();
  }, [refetchTrigger]);

  const triggerRefetch = () => {
    setRefetchTrigger(!refetchTrigger);
  };

  return (
    <div className="max-w-screen-lg space-y-8 m-[3%]">
      <h2 className="text-2xl font-semibold text-gray-700">Your Shopping Cart</h2>
      <Suspense fallback={<p className="text-gray-600">Loading..</p>}>
        <div>
          {cartData.products.length === 0 ? (
            <p className="text-gray-500 italic">There's nothing in your cart.</p>
          ) : (
            <>
              <div className="space-y-4">
                {cartData.products.map((product: any) => (
                  <CartItemCard
                    {...product}
                    onQuantityChange={triggerRefetch}
                    onRemoveItem={triggerRefetch}
                    key={product.id}
                  />
                ))}
              </div>

              <p className="text-xl text-gray-700 font-semibold mt-4">
                Cart Total: ${cartData.cartTotal}
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
                  disabled={cartData.length === 0}
                >
                  Clear Cart
                </button>
              </div>
            </>
          )}
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

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/carts/local-cart`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(productsToOrder),
      }
    );

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
  if (response.status === 200) {
    return await response.json();
  }
}

export async function loader() {
  return defer({
    cart: await loadCart(),
  });
}
