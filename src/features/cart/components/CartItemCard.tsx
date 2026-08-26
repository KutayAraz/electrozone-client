import { ChangeEvent } from "react";
import { Link } from "react-router-dom";

import { paths } from "@/config/paths";
import { createUrlSlug } from "@/utils/create-url-slug";
import Bin from "@assets/svgs/bin.svg?react";

type CartItemCardProps = {
  id: number;
  productName: string;
  thumbnail: string;
  quantity: number;
  price: string;
  amount: string;
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
  const productUrl = paths.products.category.subcategory.product.getHref({
    category,
    subcategory,
    productSlug: `${createUrlSlug(productName)}-p-${id}`,
  });

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-3 sm:p-4 shadow-sm transition-shadow duration-200 hover:shadow-md my-2">
      <div className="flex space-x-3 sm:space-x-4">
        {/* Product Image */}
        <Link
          to={productUrl}
          className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md"
          aria-label={`View details for ${productName}`}
        >
          <div className="relative h-20 w-20 sm:h-28 sm:w-28 md:h-32 md:w-32">
            <img
              src={thumbnail}
              alt={productName}
              className="h-full w-full rounded-md object-contain transition-transform duration-200 hover:scale-105"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Product Details */}
        <div className="flex flex-1 flex-col justify-between min-w-0">
          <div>
            <Link
              to={productUrl}
              className="mb-1 block font-medium text-gray-800 transition-colors duration-200 hover:text-blue-600 focus:outline-none focus:text-blue-600 focus:underline"
            >
              <h3 className="text-sm sm:text-base line-clamp-2">{productName}</h3>
            </Link>
            <p className="text-xs sm:text-sm text-gray-500">
              Unit Price: <span className="font-medium">${price}</span>
            </p>
          </div>

          {/* Price and Actions */}
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center">
                <label
                  htmlFor={`quantity-${id}`}
                  className="mr-1 text-xs sm:text-sm font-medium text-gray-600"
                >
                  Qty:
                </label>
                <select
                  id={`quantity-${id}`}
                  value={quantity}
                  onChange={(e) => onQuantityChange(e, id)}
                  className="rounded-md border border-gray-300 p-1 sm:p-1.5 text-xs sm:text-sm shadow-sm transition-colors duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 hover:border-gray-400"
                  aria-describedby={`quantity-help-${id}`}
                >
                  {Array.from({ length: 10 }, (_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {index + 1}
                    </option>
                  ))}
                </select>
                <span id={`quantity-help-${id}`} className="sr-only">
                  Select quantity for {productName}
                </span>
              </div>

              <button
                onClick={onRemoveItem}
                className="inline-flex items-center px-1 sm:px-2 py-1 text-xs sm:text-sm font-medium text-red-600 transition-colors duration-200 hover:text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-1 rounded-md"
                aria-label={`Remove ${productName} from cart`}
              >
                <Bin className="h-3 w-3 sm:h-4 sm:w-4 mr-1" aria-hidden="true" />
                <span className="hidden sm:inline">Remove</span>
              </button>
            </div>

            <div className="text-right">
              <p className="text-base sm:text-lg font-semibold text-gray-800">
                <span className="sr-only">Total price: </span>${amount}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
