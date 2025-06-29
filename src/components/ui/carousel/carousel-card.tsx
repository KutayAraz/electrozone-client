import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "@/stores/store";
import { createUrlSlug } from "@/utils/create-url-slug";

import { WishlistHeart } from "../wishlist-heart";

export interface CarouselCardProps {
  id: number;
  productName: string;
  brand: string;
  price: number;
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
        to={`/category/${category}/${subcategory}/${createUrlSlug(productName)}-p-${id}`}
        className="flex flex-col items-center rounded-md border-1 border-gray-300 bg-white p-2 shadow-sm hover:bg-gray-100 hover:shadow-md"
        key={id}
      >
        <div className="ml-auto h-6 pr-1 text-right">
          <WishlistHeart
            isWishlisted={isWishlisted}
            onClick={() => onWishlistToggle(id)}
            disabled={isTogglingWishlist(id)}
          />
        </div>
        <div className="h-[100px] rounded-md pt-2 sm:h-[160px]">
          <img
            src={thumbnail}
            alt={productName}
            className="size-full object-contain"
            loading="lazy"
          />
        </div>
        <p className="mt-2 line-clamp-3 h-[3em] text-center text-sm">{productName}</p>
        <p className="mt-2 line-clamp-3 text-center text-sm">{brand}</p>
        <p className="mt-2 line-clamp-3 text-center text-sm ">${price}</p>
      </Link>
    </div>
  );
};
