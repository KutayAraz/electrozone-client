import { Divider, Rating } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "@/stores/store";
import { createUrlSlug } from "@/utils/create-url-slug";

import { WishlistHeart } from "../wishlist-heart";

export interface ProductCardProps {
  productId: number;
  thumbnail: string;
  productName: string;
  brand: string;
  averageRating: number;
  price: number;
  stock: number;
  subcategory: string;
  category: string;
  onWishlistToggle: (id: number) => void;
  onAddToCart: (id: number) => void;
  className?: string;
}

export const ProductCard = ({
  productId,
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
}: ProductCardProps) => {
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const isWishlisted = wishlist.items.includes(productId);

  return (
    <div className={`w-full p-2 xs:w-1/2 md:w-1/3 lg:w-1/4 ${className}`}>
      <Link
        to={`/category/${
          category + "/" + subcategory + "/" + createUrlSlug(productName) + "-p-" + productId
        }`}
        className="group flex rounded-lg border-1 border-gray-300 px-1 py-2 hover:shadow-md xs:flex-col xs:justify-between xs:pt-2 "
      >
        <div className="absolute right-4 z-[2] xs:relative xs:ml-auto">
          <button
            onClick={() => onWishlistToggle(productId)}
            aria-label="Remove from wishlist"
            className="scale-100 transition-transform duration-300 hover:scale-110"
          >
            <WishlistHeart
              isWishlisted={isWishlisted}
              onClick={() => onWishlistToggle(productId)}
            />
          </button>
        </div>
        <div className="flex-1">
          <img
            src={thumbnail}
            alt={productName}
            className="mx-auto size-56 min-w-[120px] object-contain pr-1 group-hover:scale-[1.005] xs:mb-4"
          />
        </div>
        <div>
          <Divider orientation="vertical" className="m-2 block self-stretch xs:hidden" />
          <Divider className="hidden self-stretch xs:block" />
        </div>
        <div className="flex flex-1 flex-col justify-between pb-2 pt-8 text-center xs:mt-2 xs:space-y-2 xs:pt-2 [&_p]:px-6 [&_p]:text-sm">
          <p className="xs: line-clamp-2 xs:min-h-[3em]" title={productName}>
            {productName}
          </p>
          <p className="font-[700]">{brand}</p>
          <Rating
            name="half-rating-read"
            value={averageRating}
            precision={0.1}
            readOnly
            className="mx-auto"
          />
          <p className="pr-2">$ {price}</p>
          <button
            onClick={() => onAddToCart(productId)}
            disabled={stock < 1}
            className={`${
              stock > 0 ? "bg-theme-blue hover:bg-blue-800" : "bg-gray-500"
            } mx-auto w-4/5 rounded-lg py-[6px] text-sm text-white shadow transition-colors duration-200 ease-in-out xs:px-6`}
          >
            {stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </Link>
    </div>
  );
};
