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
  // Remember what was dismissed
  const priceKey = JSON.stringify(priceChanges ?? []);
  const quantityKey = JSON.stringify(quantityChanges ?? []);
  const removedKey = JSON.stringify(removedCartItems ?? []);

  const [dismissedPriceKey, setDismissedPriceKey] = useState<string | null>(null);
  const [dismissedQuantityKey, setDismissedQuantityKey] = useState<string | null>(null);
  const [dismissedRemovedKey, setDismissedRemovedKey] = useState<string | null>(null);

  const showPriceAlert = Boolean(priceChanges?.length) && dismissedPriceKey !== priceKey;
  const showQuantityAlert =
    Boolean(quantityChanges?.length) && dismissedQuantityKey !== quantityKey;
  const showRemovedAlert = Boolean(removedCartItems?.length) && dismissedRemovedKey !== removedKey;

  if (!showPriceAlert && !showQuantityAlert && !showRemovedAlert) {
    return null;
  }

  return (
    <div className="mb-6 space-y-3">
      {/* Price Changes Alert */}
      {priceChanges && showPriceAlert && (
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
                    {priceChanges.map((change) => (
                      <li key={change.productName}>
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
              onClick={() => setDismissedPriceKey(priceKey)}
            >
              <span className="sr-only">Close</span>

              <Close className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Quantity Changes Alert */}
      {quantityChanges && showQuantityAlert && (
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
                    {quantityChanges.map((change) => (
                      <li key={change.productName}>
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
              onClick={() => setDismissedQuantityKey(quantityKey)}
            >
              <span className="sr-only">Close</span>

              <Close className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Removed Items Alert */}
      {removedCartItems && showRemovedAlert && (
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
                    {removedCartItems.map((itemName) => (
                      <li key={itemName}>
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
              onClick={() => setDismissedRemovedKey(removedKey)}
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
