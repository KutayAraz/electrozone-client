import { ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { createUrlSlug } from "@/utils/create-url-slug";
import Bin from "@assets/svgs/bin.svg?react";

type CartItemCardProps = {
  id: number;
  productName: string;
  thumbnail: string;
  quantity: number;
  price: string;
  amount: number;
  category: string;
  subcategory: string;
  onRemoveItem: () => void;
  onQuantityChange: (event: ChangeEvent<HTMLSelectElement>, productId: number) => void;
};

export const CartItemCard = ({
  id,
  productName,
  price,
  thumbnail,
  quantity,
  amount,
  subcategory,
  category,
  onRemoveItem,
  onQuantityChange,
}: CartItemCardProps) => {
  // Create product URL
  const productUrl = `/category/${category}/${subcategory}/${createUrlSlug(productName)}-p-${id}`;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md">
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        {/* Product Image */}
        <Link to={productUrl} className="flex-shrink-0">
          <div className="relative h-32 w-full sm:h-28 sm:w-28">
            <img
              src={thumbnail}
              alt={productName}
              className="h-full w-full rounded-md object-contain"
            />
          </div>
        </Link>

        {/* Product Details */}
        <div className="flex flex-1 flex-col justify-between">
          <div>
            <Link
              to={productUrl}
              className="mb-1 block font-medium text-gray-800 transition duration-200 hover:text-blue-600"
            >
              {productName}
            </Link>
            <p className="text-sm text-gray-500">Unit Price: ${price}</p>
          </div>

          {/* Price and Actions */}
          <div className="mt-2 flex items-end justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <label htmlFor={`quantity-${id}`} className="mr-2 text-sm text-gray-600">
                  Qty:
                </label>
                <select
                  id={`quantity-${id}`}
                  value={quantity}
                  onChange={(e) => onQuantityChange(e, id)}
                  className="rounded-md border border-gray-300 p-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {Array.from({ length: 10 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={onRemoveItem}
                className="flex items-center text-red-700 hover:text-red-900"
                aria-label="Remove item"
              >
                <Bin className="h-5 w-5" />
                <span className="ml-1 text-sm">Remove</span>
              </button>
            </div>

            <div className="text-right">
              <p className="text-lg font-semibold text-gray-800">${amount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
