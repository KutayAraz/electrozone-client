import { useNavigate } from "react-router-dom";

import { Spinner } from "@/components/ui/spinner";
import { CartChangesAlert } from "@/features/cart/components/cart-changes-alert";
import { CartItemCard } from "@/features/cart/components/cart-item-card";
import { useClearCart } from "@/features/cart/hooks/use-clear-cart";
import { useGetCart } from "@/features/cart/hooks/use-get-cart";
import { useRemoveFromCart } from "@/features/cart/hooks/use-remove-from-cart";
import { useUpdateQuantity } from "@/features/cart/hooks/use-update-quantity";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { CheckoutIntent } from "@/stores/slices/models";
import { selectIsAuthenticated, setUserIntent } from "@/stores/slices/user-slice";
import Bin from "@assets/svgs/bin.svg?react";
import RightArrow from "@assets/svgs/right-arrow.svg?react";

export const CartPage = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { cartData, isLoading: isCartLoading, isFetching: isFetchingCartData } = useGetCart();

  // Cart operation hooks
  const { removeFromCart, isLoading: isRemoving } = useRemoveFromCart();
  const { updateQuantity, isLoading: isUpdating } = useUpdateQuantity();
  const { clearCart, isLoading: isClearing } = useClearCart();

  // Combined loading state for cart modifications
  const isModifying = isRemoving || isUpdating || isClearing;

  const handleRemoveItem = async (productId: number) => {
    await removeFromCart(productId);
  };

  const handleQuantityChange = async (productId: number, quantity: number) => {
    await updateQuantity(productId, quantity);
  };

  const handleClearCart = async () => {
    await clearCart();
  };

  const proceedToCheckout = () => {
    if (!isAuthenticated) {
      dispatch(setUserIntent(CheckoutIntent.SESSION));
      navigate("/sign-in", { state: { from: { pathname: "/checkout" } } });
    } else {
      navigate("/checkout", { replace: true });
    }
  };

  const isCartEmpty = !cartData?.cartItems || cartData.cartItems.length === 0;

  return (
    <div className="page-spacing">
      <h1 className="mb-6 text-2xl font-bold text-gray-800 md:text-3xl">Your Shopping Cart</h1>

      {/* Cart Changes Alert */}
      <CartChangesAlert
        priceChanges={cartData?.priceChanges}
        quantityChanges={cartData?.quantityChanges}
        removedCartItems={cartData?.removedCartItems}
      />

      {isCartLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Spinner size={16} />
        </div>
      ) : isCartEmpty ? (
        <div className="rounded-lg bg-gray-50 p-8 text-center">
          <p className="mb-4 text-lg text-gray-600">Your cart is empty</p>
          <button
            onClick={() => navigate("/")}
            className="rounded-md bg-theme-blue px-4 py-2 text-white transition duration-200 hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="relative mb-4 rounded-md bg-white p-4 shadow-sm">
              {/* Localized loading overlay - only covers cart items */}
              {(isModifying || isFetchingCartData) && (
                <div className="absolute inset-0 z-10 backdrop-blur-[1px]">
                  <div className="absolute inset-0 bg-white/70"></div>
                  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                    <Spinner size={24} />
                    <p className="mt-2 text-sm font-medium text-gray-700">Updating cart...</p>
                  </div>
                </div>
              )}

              <h2 className="mb-4 text-lg font-semibold text-gray-700">
                Items ({cartData?.totalQuantity || 0})
              </h2>

              <div className="space-y-4">
                {cartData?.cartItems.map((cartItem: any) => (
                  <CartItemCard
                    key={cartItem.id}
                    id={cartItem.id}
                    thumbnail={cartItem.thumbnail}
                    subcategory={cartItem.subcategory}
                    category={cartItem.category}
                    productName={cartItem.productName}
                    price={cartItem.price}
                    quantity={cartItem.quantity}
                    amount={cartItem.amount}
                    onQuantityChange={(e, productId) => {
                      handleQuantityChange(Number(productId), parseInt(e.target.value));
                    }}
                    onRemoveItem={() => handleRemoveItem(cartItem.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Cart Summary Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-lg font-semibold text-gray-700">Cart Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between border-b pb-3">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium">${Number(cartData?.cartTotal || 0).toFixed(2)}</p>
                </div>

                <div className="flex justify-between border-b pb-3">
                  <p className="text-gray-600">Items</p>
                  <p>{cartData?.totalQuantity || 0}</p>
                </div>

                <div className="flex justify-between pt-2">
                  <p className="text-lg font-semibold">Total</p>
                  <p className="text-lg font-bold text-theme-blue">
                    ${Number(cartData?.cartTotal || 0).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={proceedToCheckout}
                  disabled={isModifying || isCartEmpty}
                  className="flex w-full items-center justify-center space-x-2 rounded-md bg-theme-blue py-3 text-white transition duration-200 hover:bg-blue-700 disabled:opacity-70"
                >
                  <span>Proceed to Checkout</span>
                  <RightArrow className="h-auto w-5" />
                </button>

                <button
                  onClick={handleClearCart}
                  disabled={isModifying || isCartEmpty}
                  className="flex w-full items-center justify-center space-x-2 rounded-md border border-red-700 bg-white py-3 text-red-700 transition duration-200 hover:bg-red-50 disabled:opacity-70"
                >
                  <Bin className="h-auto w-5 fill-red-700" />
                  <span>Clear Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
