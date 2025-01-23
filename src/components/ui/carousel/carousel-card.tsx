import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useFetch } from "@/hooks/use-fetch";
import { displayAlert } from "@/stores/slices/alert-slice";
import { addToWishlist, removeFromWishlist } from "@/stores/slices/wishlist-slice";
import { RootState } from "@/stores/store";
import { createUrlSlug } from "@/utils/create-url-slug";
import { truncateString } from "@/utils/truncate-string";
import { ReactComponent as HeartIcon } from "@assets/svgs/wishlist-heart.svg";

export interface CarouselCardProps {
  id: number;
  productName: string;
  brand: string;
  price: number;
  thumbnail: string;
  subcategory: string;
  category: string;
}

export const CarouselCard = ({
  id,
  productName,
  brand,
  price,
  thumbnail,
  subcategory,
  category,
}: CarouselCardProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch<any>();
  const { fetchData } = useFetch();

  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const navigate = useNavigate();

  const wishlist = useSelector((state: RootState) => state.wishlist);
  const isWishlisted = wishlist.items.includes(id);

  const handleWishlistButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 100);

    setTimeout(() => {
      toggleWishlist(id);
    }, 300);
  };

  const toggleWishlist = async (id: number) => {
    if (!isSignedIn) {
      navigate("/sign-in");
    }
    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/products/${id}/wishlist`,
      "PATCH",
      null,
      true,
    );

    if (result?.response.ok) {
      if (result.data.action === "added") {
        dispatch(addToWishlist(id));
        dispatch(
          displayAlert({
            type: "success",
            message: `${truncateString(productName, 0, 20)} has been added to your wishlist`,
            autoHide: true,
          }),
        );
      } else if (result.data.action === "removed") {
        dispatch(removeFromWishlist(id));
        dispatch(
          displayAlert({
            type: "info",
            message: `${truncateString(productName, 0, 20)} has been removed to your wishlist!`,
            autoHide: true,
          }),
        );
      }
    }
  };
  return (
    <div className="relative mx-[4px] xs:mx-2 sm:mx-3">
      <Link
        to={`/category/${category}/${subcategory}/${createUrlSlug(productName)}-p-${id}`}
        className="flex flex-col items-center rounded-md border-2 bg-white p-2 shadow-sm hover:bg-gray-100"
        key={id}
      >
        <div className="ml-auto pr-1 text-right">
          <button
            onClick={handleWishlistButtonClick}
            aria-label="Remove from wishlist"
            className="scale-100 transition-transform duration-300 group-hover:scale-110"
          >
            <HeartIcon
              className={`inline-block h-auto w-6 hover:scale-125 ${isClicked ? "scale-125" : ""}`}
              fill={`${isWishlisted ? "#febd69" : "#ffffff"}`}
            />
          </button>
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
