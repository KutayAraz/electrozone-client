import { useState } from "react";
import { redirect, useLoaderData, useNavigate, useRevalidator } from "react-router-dom";

import { paths } from "@/config/paths";
import { useClearSessionCartMutation } from "@/features/cart/api/session-cart/clear-session-cart";
import { CartChangesAlert } from "@/features/cart/components/cart-changes-alert";
import { useMergeCarts } from "@/features/cart/hooks/use-merge-carts";
import { initiateCheckoutApi } from "@/features/checkout/api/initiate-checkout";
import { CartAdditionModal } from "@/features/checkout/components/cart-addition-modal";
import { CheckoutItemCard } from "@/features/checkout/components/checkout-product-card";
import { CheckoutSummary } from "@/features/checkout/components/checkout-summary";
import { UserCard } from "@/features/checkout/components/user-card";
import { useProcessOrder } from "@/features/orders/hooks/use-process-order";
import { getUserProfileApi } from "@/features/user/api/get-user-profile";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { CheckoutLayout } from "@/layouts/checkout-layout";
import { CheckoutIntent } from "@/stores/slices/models";
import { selectCheckoutIntent, setUserIntent } from "@/stores/slices/user-slice";
import { store } from "@/stores/store";
import { CheckoutType } from "@/types/checkout";

export const checkoutLoader = async () => {
  const state = store.getState();
  const userIntent: CheckoutType = state.user.checkoutIntent;

  try {
    const userInfo = await store
      .dispatch(getUserProfileApi.endpoints.getUserProfile.initiate())
      .unwrap();
    const checkoutData = await store
      .dispatch(
        initiateCheckoutApi.endpoints.initiateCheckout.initiate({ checkoutType: userIntent }),
      )
      .unwrap();
    return {
      user: userInfo,
      checkoutData,
    };
  } catch (error: any) {
    if (error.data && error.data.type === "EMPTY_CART") {
      return redirect("/cart");
    }
  }
};

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const revalidator = useRevalidator();

  const checkoutIntent = useAppSelector(selectCheckoutIntent);
  const [showModal, setShowModal] = useState(false);

  const { user, checkoutData } = useLoaderData();

  const { checkoutSnapshotId, cartData } = checkoutData;

  const { submitMergeCarts, isLoading: isMergingCarts } = useMergeCarts();
  const { placeOrder, isLoading: isPlacingOrder } = useProcessOrder();
  const [clearSessionCart, { isLoading: isClearingSessionCart }] = useClearSessionCartMutation();

  const navigateToCart = () => {
    setShowModal(false);
    navigate("/cart");
  };

  const addToCartAndNavigate = async () => {
    await submitMergeCarts();
    navigateToCart();
  };

  const handleSubmitOrder = async () => {
    const result = await placeOrder(checkoutSnapshotId, async () => {
      // Simply revalidate the route data using the loader
      revalidator.revalidate();
      return null; // No need to return cart data as revalidation will handle it
    });

    if (typeof result === "number") {
      dispatch(setUserIntent(CheckoutType.NORMAL));
      navigate(paths.checkout.success.getHref({ orderId: result.toString() }));
    }
  };

  const handleBackToCart = () => {
    if (checkoutIntent === CheckoutType.SESSION) {
      // For SESSION intent: show modal asking if user wants to merge carts
      setShowModal(true);
    } else if (checkoutIntent === CheckoutType.BUY_NOW) {
      // For BUY_NOW intent: just reset intent and navigate without asking
      dispatch(setUserIntent(CheckoutType.NORMAL));
      navigateToCart();
    } else {
      // For NORMAL intent: just navigate to cart
      navigateToCart();
    }
  };

  const cancelAndNavigate = async () => {
    await clearSessionCart();
    dispatch(setUserIntent(CheckoutIntent.NORMAL));
    navigateToCart();
  };

  return (
    <>
      <CartAdditionModal
        isOpen={showModal}
        onAddToCart={addToCartAndNavigate}
        isMerging={isMergingCarts}
        isCancelling={isClearingSessionCart}
        onCancel={cancelAndNavigate}
      />

      <CheckoutLayout onBackClick={handleBackToCart}>
        <div className="mt-2 flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2">
          <div className="max-w-screen-md grow">
            <CartChangesAlert
              priceChanges={cartData.priceChanges}
              quantityChanges={cartData.quantityChanges}
              removedCartItems={cartData.removedCartItems}
            />
            <UserCard
              firstName={user.firstName}
              lastName={user.lastName}
              email={user.email}
              address={user.address}
              city={user.city}
            />
            <div className="mt-6 max-w-screen-md grow space-y-4">
              {cartData.cartItems.map((product: any) => {
                return (
                  <CheckoutItemCard
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
          </div>
          <CheckoutSummary
            totalQuantity={cartData.totalQuantity}
            cartTotal={cartData.cartTotal}
            onOrderPlacement={handleSubmitOrder}
            isLoading={isPlacingOrder}
          />
        </div>
      </CheckoutLayout>
    </>
  );
};
