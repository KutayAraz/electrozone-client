import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { paths } from "@/config/paths";
import { RootState } from "@/stores/store";
import { createUrlSlug } from "@/utils/create-url-slug";

import { WishlistHeart } from "../wishlist-heart";

export interface CarouselCardProps {
  id: number;
  productName: string;
  brand: string;
  price: string;
  thumbnail: string;
  subcategory: string;
  category: string;
  onWishlistToggle: (id: number) => void;
  isTogglingWishlist: (id: number) => boolean;
}

export const CarouselCard = ({
  id,
  productName,
  brand,
  price,
  thumbnail,
  subcategory,
  category,
  onWishlistToggle,
  isTogglingWishlist,
}: CarouselCardProps) => {
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const isWishlisted = wishlist.items.includes(id);

  return (
    <div className="relative mx-[4px] xs:mx-2 sm:mx-3 my-1">
      <Link
        to={paths.products.category.subcategory.product.getHref({
          category,
          subcategory,
          productSlug: `${createUrlSlug(productName)}-p-${id}`,
        })}
        // `/category/${category}/${subcategory}/${createUrlSlug(productName)}-p-${id}`
        className="flex flex-col items-center rounded-lg border border-gray-200 bg-white pt-6 px-3 pb-3 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-200"
        key={id}
      >
        <div className="absolute top-2 right-2 z-10">
          <WishlistHeart
            isWishlisted={isWishlisted}
            onClick={() => onWishlistToggle(id)}
            disabled={isTogglingWishlist(id)}
          />
        </div>
        <div className="h-[100px] rounded-md pt-2 sm:h-[160px] bg-gray-50 flex items-center justify-center">
          <img
            src={thumbnail}
            alt={productName}
            className="size-full object-contain"
            loading="lazy"
          />
        </div>
        <p className="mt-3 line-clamp-3 h-[3em] text-center text-sm font-medium text-gray-800">
          {productName}
        </p>
        <p className="mt-1 text-center text-xs text-gray-500 uppercase tracking-wide">{brand}</p>
        <p className="mt-2 text-center text-base font-semibold text-gray-900">${price}</p>
      </Link>
    </div>
  );
};
