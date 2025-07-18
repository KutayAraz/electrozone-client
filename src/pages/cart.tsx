import { Collapse, List } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { TransitionGroup } from "react-transition-group";

import { Spinner } from "@/components/ui/spinner";
import { paths } from "@/config/paths";
import { CartChangesAlert } from "@/features/cart/components/cart-changes-alert";
import { CartItemCard } from "@/features/cart/components/cart-item-card";
import { CartSummary } from "@/features/cart/components/cart-summary";
import { useClearCart } from "@/features/cart/hooks/use-clear-cart";
import { useGetCart } from "@/features/cart/hooks/use-get-cart";
import { useRemoveFromCart } from "@/features/cart/hooks/use-remove-from-cart";
import { useUpdateQuantity } from "@/features/cart/hooks/use-update-quantity";
import { CartItem } from "@/features/cart/types/response";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { CheckoutIntent } from "@/stores/slices/models";
import { selectIsAuthenticated, setUserIntent } from "@/stores/slices/user-slice";

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
    if (!isAuthenticated) dispatch(setUserIntent(CheckoutIntent.SESSION));
    navigate(paths.checkout.root.getHref());
  };

  const isCartEmpty = !cartData?.cartItems || cartData.cartItems.length === 0;

  return (
    <div className="page-spacing">
      <h1 className="mb-2 text-xl font-bold text-gray-800">Your Shopping Cart</h1>

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
        <div className="md:grid md:grid-cols-3 md:gap-8">
          {/* Cart Items Section */}
          <div className="md:col-span-2">
            <div className="relative mb-4 rounded-md bg-white">
              {/* Localized loading overlay - only covers cart items */}
              {(isModifying || isFetchingCartData) && (
                <div className="absolute inset-0 z-10 backdrop-blur-[1px]">
                  <div className="absolute inset-0 bg-white/70"></div>
                  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                    <Spinner size={24} />
                    <p className="mt-2 text-sm font-medium">Updating cart...</p>
                  </div>
                </div>
              )}

              <h2 className="text-lg font-semibold">Items ({cartData?.totalQuantity || 0})</h2>

              <List sx={{ mt: 1 }}>
                <TransitionGroup>
                  {cartData?.cartItems.map((cartItem: CartItem) => (
                    <Collapse key={cartItem.id}>
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
                    </Collapse>
                  ))}
                </TransitionGroup>
              </List>
            </div>
          </div>

          {/* Cart Summary Section */}
          <div className="lg:col-span-1">
            <CartSummary
              cartTotal={Number(cartData?.cartTotal || 0)}
              totalQuantity={cartData?.totalQuantity || 0}
              isModifying={isModifying}
              isCartEmpty={isCartEmpty}
              onProceedToCheckout={proceedToCheckout}
              onClearCart={handleClearCart}
            />
          </div>
        </div>
      )}
    </div>
  );
};
