import { Rating } from "@mui/material";
import { forwardRef, useState } from "react";
import { Link } from "react-router-dom";

import { paths } from "@/config/paths";
import { useAppSelector } from "@/hooks/use-app-selector";
import { RootState } from "@/stores/store";
import { createUrlSlug } from "@/utils/create-url-slug";

import { WishlistHeart } from "../wishlist-heart";

export interface ProductCardProps {
  id: number;
  thumbnail: string;
  productName: string;
  brand: string;
  averageRating: string;
  price: string;
  stock: number;
  subcategory: string;
  category: string;
  onWishlistToggle: (id: number) => void;
  onAddToCart: (id: number) => void;
  className?: string;
  isAddingToCart: boolean;
  isTogglingWishlist: boolean;
}

export const ProductCard = forwardRef(
  (
    {
      id,
      thumbnail,
      productName,
      brand,
      averageRating,
      price,
      stock,
      subcategory,
      category,
      onWishlistToggle,
      onAddToCart,
      className,
      isAddingToCart = false,
      isTogglingWishlist = false,
    }: ProductCardProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const wishlist = useAppSelector((state: RootState) => state.wishlist);
    const isWishlisted = wishlist.items.includes(id);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onAddToCart(id);
    };

    const handleWishlistToggle = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onWishlistToggle(id);
    };

    return (
      <div className={`w-full p-1.5 xs:w-1/2 md:w-1/3 lg:w-1/4 sm:p-3 ${className}`} ref={ref}>
        <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform overflow-hidden flex flex-col h-full">
          <div className="relative w-full h-42 sm:h-56 md:h-64 overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
            {/* Stock Badge */}
            {stock <= 5 && stock > 0 && (
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">
                Only {stock} left
              </div>
            )}

            {/* Wishlist Heart */}
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
              <WishlistHeart
                isWishlisted={isWishlisted}
                onClick={handleWishlistToggle}
                disabled={isTogglingWishlist}
                className={`${isTogglingWishlist ? "opacity-70 cursor-not-allowed" : ""} 
                  bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white hover:scale-110 transition-all duration-200`}
              />
            </div>

            {/* Product Image */}
            <Link
              to={paths.products.category.subcategory.product.getHref({
                category,
                subcategory,
                productSlug: `${createUrlSlug(productName)}-p-${id}`,
              })}
              className="block w-full h-full"
            >
              <div className="w-full h-full flex items-center justify-center p-4">
                <img
                  src={thumbnail}
                  alt={productName}
                  className={`max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              {/* Gradient overlay that appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-3 sm:p-4 flex flex-col min-h-0">
            <Link
              to={paths.products.category.subcategory.product.getHref({
                category,
                subcategory,
                productSlug: `${createUrlSlug(productName)}-p-${id}`,
              })}
              className="flex-1 flex flex-col"
            >
              {/* Brand */}
              <div className="mb-1.5 sm:mb-2">
                <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 sm:py-1 rounded-full uppercase tracking-wide">
                  {brand}
                </span>
              </div>

              {/* Product Name */}
              <h3 className="text-gray-900 font-semibold text-sm leading-tight line-clamp-2 h-10 sm:h-12 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-200">
                {productName}
              </h3>

              {/* Rating */}
              <div className="flex items-center mb-2 sm:mb-3">
                <Rating
                  value={Number(averageRating)}
                  precision={0.1}
                  readOnly
                  size="small"
                  sx={{
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                    "& .MuiRating-iconFilled": {
                      color: "#fbbf24",
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "#e5e7eb",
                    },
                  }}
                />
                <span className="text-xs text-gray-500 ml-1 sm:ml-2">
                  ({Number(averageRating).toFixed(1)})
                </span>
              </div>

              {/* Price and Stock Row */}
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-baseline space-x-1">
                  <span className="text-lg font-bold text-gray-900">${price}</span>
                </div>

                {/* Stock indicator */}
                <div className="flex items-center">
                  <div
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1.5 sm:mr-2 ${
                      stock > 10
                        ? "bg-green-400"
                        : stock > 5
                        ? "bg-yellow-400"
                        : stock > 0
                        ? "bg-orange-400"
                        : "bg-red-400"
                    }`}
                  />
                  <span className="text-xs text-gray-500">
                    {stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </Link>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={stock < 1 || isAddingToCart}
              className={`w-full py-2 sm:py-1.5 rounded-lg text-white font-semibold transition-all duration-200 text-sm sm:text-base ${
                stock > 0 && !isAddingToCart
                  ? "bg-theme-blue hover:bg-blue-700 hover:shadow-md"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {isAddingToCart ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Adding...</span>
                </div>
              ) : stock > 0 ? (
                "Add to Cart"
              ) : (
                "Out of Stock"
              )}
            </button>
          </div>

          {/* Hover border effect */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300 pointer-events-none" />
        </div>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";
