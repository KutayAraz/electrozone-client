import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "@/stores/store";
import { createUrlSlug } from "@/utils/create-url-slug";

import { WishlistHeart } from "../wishlist-heart";

export interface CarouselCardProps {
  productId: number;
  productName: string;
  brand: string;
  price: number;
  thumbnail: string;
  subcategory: string;
  category: string;
  onWishlistToggle: (id: number) => void;
}

export const CarouselCard = ({
  productId,
  productName,
  brand,
  price,
  thumbnail,
  subcategory,
  category,
  onWishlistToggle,
}: CarouselCardProps) => {
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const isWishlisted = wishlist.items.includes(productId);

  return (
    <div className="relative mx-[4px] xs:mx-2 sm:mx-3">
      <Link
        to={`/category/${category}/${subcategory}/${createUrlSlug(productName)}-p-${productId}`}
        className="flex flex-col items-center rounded-md border-2 bg-white p-2 shadow-sm hover:bg-gray-100"
        key={productId}
      >
        <div className="ml-auto pr-1 text-right">
          <WishlistHeart isWishlisted={isWishlisted} onClick={() => onWishlistToggle(productId)} />
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
