import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

import { paths } from "@/config/paths";
import { createUrlSlug } from "@/utils/create-url-slug";

interface OrderItemDetailsCardProps {
  id: number;
  productName: string;
  thumbnail: string;
  quantity: number;
  price: number;
  brand: string;
  subcategory: string;
  category: string;
}

export const OrderItemDetailsCard = ({
  id,
  productName,
  thumbnail,
  quantity,
  price,
  brand,
  subcategory,
  category,
}: OrderItemDetailsCardProps) => {
  const productUrl = paths.products.category.subcategory.product.getHref({
    category,
    subcategory,
    productSlug: `${createUrlSlug(productName)}-p-${id}`,
  });

  return (
    <Link
      to={productUrl}
      className="group block w-full rounded-lg border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-gray-300 hover:shadow-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
      aria-label={`View details for ${productName} by ${brand}`}
    >
      {/* Product Image Container */}
      <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden rounded-md bg-gray-50">
        <img
          src={thumbnail}
          alt={`${productName}`}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>

      <Divider sx={{ marginBottom: 2 }} />

      {/* Product Information */}
      <div className="space-y-2">
        {/* Product Name */}
        <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 transition-colors duration-200">
          {productName}
        </h3>

        {/* Brand */}
        <p className="text-xs font-medium text-gray-600 transition-colors duration-200">{brand}</p>

        {/* Quantity and Price */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Quantity:</span>
            <span className="text-xs font-medium text-gray-700 transition-colors duration-200">
              {quantity}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Total:</span>
            <span className="text-sm font-bold text-gray-900 transition-colors duration-200">
              ${price}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
