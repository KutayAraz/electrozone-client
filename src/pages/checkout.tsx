import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { useMergeCartsMutation } from "@/features/cart/api/user-cart/merge-carts";
import { CartChangesAlert } from "@/features/cart/components/cart-changes-alert";
import { initiateCheckoutApi } from "@/features/checkout/api/initiate-checkout";
import { CartAdditionModal } from "@/features/checkout/components/cart-addition-modal";
import { CheckoutItemCard } from "@/features/checkout/components/checkout-product-card";
import { CheckoutSummary } from "@/features/checkout/components/checkout-summary";
import { UserCard } from "@/features/checkout/components/user-card";
import { useProcessOrderMutation } from "@/features/orders/api/process-order";
import { getUserProfileApi } from "@/features/user/api/get-user-profile";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { CheckoutLayout } from "@/layouts/checkout-layout";
import { selectCheckoutIntent, setUserIntent } from "@/stores/slices/user-slice";
import { store } from "@/stores/store";
import { ErrorType } from "@/types/api-error";
import { CheckoutType } from "@/types/checkout";

export const checkoutLoader = async () => {
  const state = store.getState();
  const userIntent: CheckoutType = state.user.checkoutIntent;

  const userInfo = await store
    .dispatch(getUserProfileApi.endpoints.getUserProfile.initiate())
    .unwrap();
  const checkoutData = await store
    .dispatch(initiateCheckoutApi.endpoints.initiateCheckout.initiate({ checkoutType: userIntent }))
    .unwrap();

  return {
    user: userInfo,
    checkoutData,
  };
};

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const checkoutIntent = useAppSelector(selectCheckoutIntent);
  const { user, checkoutData } = useLoaderData();
  const { checkoutSnapshotId, cartData } = checkoutData;

  const [processOrder, { isLoading: isPlacingOrder }] = useProcessOrderMutation();
  const [mergeCarts, { isLoading: isMergingCarts }] = useMergeCartsMutation();

  const [showModal, setShowModal] = useState(false);

  const navigateToCart = () => {
    setShowModal(false);
    navigate("/cart");
  };

  const addToCartAndNavigate = async () => {
    await mergeCarts();
    dispatch(setUserIntent(CheckoutType.NORMAL));

    dispatch(
      displayNotification({
        type: NotificationType.SUCCESS,
        message: "Your cart items before logging in, are added to your user cart.",
      }),
    );

    navigateToCart();
  };

  const placeOrder = async () => {
    try {
      const result = await processOrder(checkoutSnapshotId).unwrap();

      dispatch(setUserIntent(CheckoutType.NORMAL));

      dispatch(
        displayNotification({
          type: NotificationType.SUCCESS,
          message: `Your order has been placed with confirmation number ${result.orderId}.`,
        }),
      );
    } catch (error: any) {
      if (error.status === 400 || error.status === 409) {
        // Check for specific validation error types
        const errorType = error.data?.errorType;

        if (
          errorType === ErrorType.STOCK_LIMIT_EXCEEDED ||
          errorType === ErrorType.QUANTITY_LIMIT_EXCEEDED ||
          errorType === ErrorType.PRICE_CHANGED
        ) {
          // Refresh checkout to get updated cart information
          // refetchCartFunction();
        }
      } else {
        // Generic error handling for other errors
        dispatch(
          displayNotification({
            type: NotificationType.ERROR,
            message: "An error occurred while placing your order. Please try again.",
            autoHide: false,
          }),
        );
      }
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

  return (
    <>
      <CartAdditionModal
        isOpen={showModal}
        onAddToCart={addToCartAndNavigate}
        isMerging={isMergingCarts}
        onCancel={navigateToCart}
      />

      <CheckoutLayout onBackClick={handleBackToCart}>
        <div className="mt-2 flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-x-2">
          <div className="max-w-screen-md grow">
            <CartChangesAlert
              priceChanges={cartData.priceChanges}
              quantityChanges={cartData.quantityChanges}
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
            onOrderPlacement={placeOrder}
            isLoading={isPlacingOrder}
          />
        </div>
      </CheckoutLayout>
    </>
  );
};
