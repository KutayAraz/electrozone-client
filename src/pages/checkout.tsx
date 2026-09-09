import { useState } from "react";
import { redirect, useLoaderData, useNavigate, useRevalidator } from "react-router-dom";

import { PageHelmet } from "@/components/seo/PageHelmet";
import { paths } from "@/config/paths";
import { useClearSessionCartMutation } from "@/features/cart/api/session-cart/clear-session-cart";
import { CartChangesAlert } from "@/features/cart/components/CartChangesAlert";
import { useMergeCarts } from "@/features/cart/hooks/useMergeCarts";
import { initiateCheckoutApi } from "@/features/checkout/api/initiate-checkout";
import { CartAdditionModal } from "@/features/checkout/components/CartAdditionModal";
import { CheckoutItemCard } from "@/features/checkout/components/CheckoutProductCard";
import { CheckoutSummary } from "@/features/checkout/components/CheckoutSummary";
import { UserCard } from "@/features/checkout/components/UserCard";
import { useProcessOrder } from "@/features/orders/hooks/useProcessOrder";
import { getUserProfileApi } from "@/features/user/api/get-user-profile";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { CheckoutLayout } from "@/layouts/CheckoutLayout";
import { loadQuery } from "@/lib/api/load-query";
import { selectCheckoutIntent, setUserIntent } from "@/stores/slices/user-slice";
import { store } from "@/stores/store";
import { CheckoutItem, CheckoutType } from "@/types/checkout";
import { isStandardApiError } from "@/utils/error-guard";

export const checkoutLoader = async () => {
  const state = store.getState();
  const userIntent: CheckoutType = state.user.checkoutIntent;

  try {
    const userInfo = await loadQuery(
      store.dispatch(getUserProfileApi.endpoints.getUserProfile.initiate()),
    );
    const checkoutData = await store
      .dispatch(
        initiateCheckoutApi.endpoints.initiateCheckout.initiate({ checkoutType: userIntent }),
      )
      .unwrap();

    return {
      user: userInfo,
      checkoutData,
    };
  } catch (error: unknown) {
    if (isStandardApiError(error) && error.data?.type === "EMPTY_CART") {
      return redirect("/cart");
    }

    throw error;
  }
};

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const revalidator = useRevalidator();

  const checkoutIntent = useAppSelector(selectCheckoutIntent);
  const [showModal, setShowModal] = useState(false);

  const { user, checkoutData } = useLoaderData<typeof checkoutLoader>();

  const { checkoutSnapshotId, cartData } = checkoutData;

  const { submitMergeCarts, isLoading: isMergingCarts } = useMergeCarts();
  const { placeOrder, isLoading: isPlacingOrder } = useProcessOrder();
  const [clearSessionCart, { isLoading: isClearingSessionCart }] = useClearSessionCartMutation();

  const navigateToCart = () => {
    setShowModal(false);
    navigate("/cart");
  };

  const addToCartAndNavigate = async () => {
    // On failure the modal stays open so the user can retry or cancel
    if (await submitMergeCarts()) navigateToCart();
  };

  const handleSubmitOrder = async () => {
    // On a cart conflict, re-run this route's loader to show the updated cart
    const result = await placeOrder(checkoutSnapshotId, () => revalidator.revalidate());

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
    dispatch(setUserIntent(CheckoutType.NORMAL));
    navigateToCart();
  };

  return (
    <>
      <PageHelmet
        title="Checkout | Electrozone"
        description="Secure and streamlined checkout process to finalize your purchases at Electrozone."
      />

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
              {cartData.cartItems.map((product: CheckoutItem) => {
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
