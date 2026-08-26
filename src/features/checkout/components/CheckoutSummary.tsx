import { LocalShipping, Receipt, ShoppingBag } from "@mui/icons-material";
import { Divider } from "@mui/material";

import { Spinner } from "@/components/ui/spinner";

type CheckoutSummaryProps = {
  totalQuantity: number;
  cartTotal: string;
  onOrderPlacement: () => void;
  isLoading: boolean;
};

export const CheckoutSummary = ({
  totalQuantity,
  cartTotal,
  onOrderPlacement,
  isLoading,
}: CheckoutSummaryProps) => {
  return (
    <div className="mt-4 mb-2 flex min-w-[300px] flex-1 flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-md md:ml-5 sm:mt-0 md:max-w-sm">
      <div className="mb-4 flex items-center">
        <Receipt className="mr-2 text-blue-600" />
        <h4 className="text-xl font-semibold text-gray-800">Order Summary</h4>
      </div>

      <div className="mb-4 space-y-3">
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center text-gray-600">
            <ShoppingBag fontSize="small" className="mr-2" />
            <span>Items ({totalQuantity})</span>
          </div>
          <span className="font-medium text-gray-800">${cartTotal}</span>
        </div>

        <div className="flex items-center justify-between py-2">
          <div className="flex items-center text-gray-600">
            <LocalShipping fontSize="small" className="mr-2" />
            <span>Shipping</span>
          </div>
          <span className="font-medium italic text-green-800">Free</span>
        </div>
      </div>

      <Divider className="my-3" />

      <div className="mb-6 flex items-center justify-between">
        <span className="text-lg font-semibold text-gray-800">Total</span>
        <span className="text-xl font-bold text-theme-blue">${cartTotal}</span>
      </div>

      <div className="">
        <button
          onClick={onOrderPlacement}
          disabled={isLoading}
          className={`w-full rounded-md px-6 py-3 text-center font-medium text-white shadow-md transition-all duration-200 ${
            isLoading
              ? "cursor-not-allowed bg-gray-400"
              : "bg-theme-orange hover:bg-orange-500 active:transform active:scale-[0.98]"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Spinner />
              Placing Order
            </div>
          ) : (
            "Confirm Order"
          )}
        </button>
      </div>
    </div>
  );
};
