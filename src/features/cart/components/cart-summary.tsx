import Bin from "@assets/svgs/bin.svg?react";
import RightArrow from "@assets/svgs/right-arrow.svg?react";

interface CartSummaryProps {
  cartTotal: number;
  totalQuantity: number;
  isModifying: boolean;
  isCartEmpty: boolean;
  onProceedToCheckout: () => void;
  onClearCart: () => void;
}

export const CartSummary = ({
  cartTotal,
  totalQuantity,
  isModifying,
  isCartEmpty,
  onProceedToCheckout,
  onClearCart,
}: CartSummaryProps) => {
  return (
    <div className="sticky top-4 rounded-lg bg-white px-4 sm:px-6 py-2 md:py-0 shadow-md">
      <h2 className="mb-3 sm:mb-4 text-base sm:text-lg font-semibold text-gray-700">
        Cart Summary
      </h2>

      <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
        <div className="flex justify-between border-b pb-2 sm:pb-3">
          <p>Subtotal</p>
          <p className="font-medium">${cartTotal.toFixed(2)}</p>
        </div>

        <div className="flex justify-between border-b pb-2 sm:pb-3">
          <p>Items</p>
          <p>{totalQuantity}</p>
        </div>

        <div className="flex justify-between pt-2">
          <p className="text-base sm:text-lg font-semibold">Total</p>
          <p className="text-base sm:text-lg font-bold text-theme-blue">${cartTotal.toFixed(2)}</p>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
        <button
          onClick={onProceedToCheckout}
          disabled={isModifying || isCartEmpty}
          className="flex w-full items-center justify-center space-x-2 rounded-md bg-theme-blue py-2.5 sm:py-3 text-sm sm:text-base text-white transition duration-200 hover:bg-blue-700 disabled:opacity-70"
        >
          <span>Proceed to Checkout</span>
          <RightArrow className="h-auto w-4 sm:w-5" />
        </button>

        <button
          onClick={onClearCart}
          disabled={isModifying || isCartEmpty}
          className="flex w-full items-center justify-center space-x-2 rounded-md border border-red-700 bg-white py-2.5 sm:py-3 text-sm sm:text-base text-red-700 transition duration-200 hover:bg-red-50 disabled:opacity-70"
        >
          <Bin className="h-auto w-4 sm:w-5 fill-red-700" />
          <span>Clear Cart</span>
        </button>
      </div>
    </div>
  );
};
