import { Close, ErrorOutline, Info, RemoveCircleOutline } from "@mui/icons-material";
import { useState } from "react";

import { ErrorType } from "@/types/api-error";

interface CartChangesAlertProps {
  priceChanges?: {
    productName: string;
    oldPrice: string;
    newPrice: string;
  }[];
  quantityChanges?: {
    productName: string;
    oldQuantity: number;
    newQuantity: number;
    reason: ErrorType;
  }[];
  removedCartItems?: string[];
}

export const CartChangesAlert = ({
  priceChanges,
  quantityChanges,
  removedCartItems,
}: CartChangesAlertProps) => {
  const [showPriceAlert, setShowPriceAlert] = useState(Boolean(priceChanges?.length));
  const [showQuantityAlert, setShowQuantityAlert] = useState(Boolean(quantityChanges?.length));
  const [showRemovedAlert, setShowRemovedAlert] = useState(Boolean(removedCartItems?.length));

  // If there are no changes or both alerts are closed, don't render anything
  if (
    (!priceChanges?.length && !quantityChanges?.length && !removedCartItems?.length) ||
    (!showPriceAlert && !showQuantityAlert && !showRemovedAlert)
  ) {
    return null;
  }

  return (
    <div className="mb-6 space-y-3">
      {/* Price Changes Alert */}
      {priceChanges && priceChanges?.length > 0 && showPriceAlert && (
        <div className="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex">
              <div className="flex-shrink-0">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Price Updates</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <ul className="list-inside space-y-1">
                    {priceChanges.map((change, index) => (
                      <li key={index}>
                        <span className="font-medium">{change.productName}</span>: Price updated
                        from ${change.oldPrice} to ${change.newPrice}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="ml-auto flex-shrink-0 rounded-md p-1.5 text-blue-500 hover:bg-blue-100"
              onClick={() => setShowPriceAlert(false)}
            >
              <span className="sr-only">Close</span>
              <Close className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Quantity Changes Alert */}
      {quantityChanges && quantityChanges?.length > 0 && showQuantityAlert && (
        <div className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex">
              <div className="flex-shrink-0">
                <ErrorOutline className="h-5 w-5 text-amber-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-800">Quantity Adjustments</h3>
                <div className="mt-2 text-sm text-amber-700">
                  <ul className="list-inside space-y-1">
                    {quantityChanges.map((change, index) => (
                      <li key={index}>
                        <span className="font-medium">{change.productName}</span>: Quantity adjusted
                        from {change.oldQuantity} to {change.newQuantity}
                        {change.reason === ErrorType.QUANTITY_LIMIT_EXCEEDED
                          ? " (quantity limit exceeded)"
                          : " (limited stock available)"}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="ml-auto flex-shrink-0 rounded-md p-1.5 text-amber-500 hover:bg-amber-100"
              onClick={() => setShowQuantityAlert(false)}
            >
              <span className="sr-only">Close</span>
              <Close className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Removed Items Alert */}
      {removedCartItems && removedCartItems?.length > 0 && showRemovedAlert && (
        <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 shadow-sm">
          <div className="flex items-start justify-between">
            <div className="flex">
              <div className="flex-shrink-0">
                <RemoveCircleOutline className="h-5 w-5 text-red-600" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Removed Items</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>The following items have been removed from your cart:</p>
                  <ul className="mt-1 list-inside space-y-1">
                    {removedCartItems.map((itemName, index) => (
                      <li key={index}>
                        <span className="font-medium">{itemName}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-1 text-xs text-red-600">
                    These items may be out of stock or no longer available.
                  </p>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="ml-auto flex-shrink-0 rounded-md p-1.5 text-red-500 hover:bg-red-100"
              onClick={() => setShowRemovedAlert(false)}
            >
              <span className="sr-only">Close</span>
              <Close className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
