import { Divider, Rating } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { useFetch } from "@/hooks/use-fetch";
import { displayAlert } from "@/stores/slices/alert-slice";
import { addItemToCart } from "@/stores/slices/local-cart-slice";
import { updateCartItemCount } from "@/stores/slices/user-slice";
import { RootState } from "@/stores/store";
import { truncateString } from "@/utils/truncate-string";
import { ReactComponent as HeartIcon } from "@assets/svgs/wishlist-heart.svg";

type WishlistProductCardProps = {
  id: number;
  productName: string;
  brand: string;
  thumbnail: string;
  price: number;
  averageRating: number;
  stock: number;
  subcategory: string;
  category: string;
  onAddToCart: (id: number, e: React.MouseEvent) => void;
  onRemoveFromWishlist: (id: number) => void;
};

export const WishlistProductCard = ({
  id,
  productName,
  brand,
  thumbnail,
  price,
  averageRating,
  subcategory,
  category,
  onRemoveFromWishlist,
}: WishlistProductCardProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const dispatch = useDispatch<any>();
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const { fetchData } = useFetch();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsClicked(!isClicked);
    if (isSignedIn) {
      const result = await fetchData(
        `${import.meta.env.VITE_API_URL}/carts/user-cart`,
        "POST",
        { productId: id, quantity: 1 },
        true,
        false,
        "addToCart",
      );
      if (result?.response.ok)
        dispatch(updateCartItemCount({ cartItemCount: result.data.totalQuantity }));
    } else {
      dispatch(addItemToCart({ id, quantity: 1 }));
    }

    dispatch(
      displayAlert({
        type: "success",
        message: `${truncateString(productName, 0, 20)} has been added to your cart!`,
        autoHide: true,
      }),
    );
  };

  const handleWishlistButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 100);

    setTimeout(() => {
      onRemoveFromWishlist(id);
    }, 300);
  };
  return (
    <div className="mb-3 w-full items-center px-2 text-center xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5">
      <Link
        to={`/category/${category + "/" + subcategory + "/" + id}`}
        className="flex h-full rounded-md border-1 border-gray-300 p-2 shadow-md hover:bg-gray-100 xs:flex-col xs:justify-between xs:px-4 xs:pt-4"
      >
        <div className="ml-auto pr-1 text-right">
          <button
            onClick={handleWishlistButtonClick}
            aria-label="Remove from wishlist"
            className="scale-100 transition-transform duration-300 group-hover:scale-110"
          >
            <HeartIcon
              className={`inline-block h-auto w-8 hover:scale-125 ${isClicked ? "scale-125" : ""}`}
              fill={"#febd69"}
            />
          </button>
        </div>
        <div className="flex-1 px-2 xs:px-0 ">
          <img
            src={thumbnail}
            alt={productName}
            className="mx-auto size-56 min-w-[100px] object-contain xs:h-[256px] xs:w-auto"
          />
        </div>
        <div className="my-auto flex flex-1 flex-col justify-between space-y-2 px-2 xs:mt-2 xs:px-0">
          <Divider orientation="vertical" className="m-2 self-stretch xs:hidden" />
          <Divider className="hidden self-stretch xs:block" />
          <p>{productName}</p>
          <p className="font-[500]">{brand}</p>

          <Rating
            name="half-rating-read"
            value={averageRating}
            precision={0.1}
            readOnly
            className="mx-auto"
          />

          <p className="text-lg">$ {price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="mx-auto w-full max-w-[80%] rounded-lg border-2 bg-theme-blue p-[0.3rem] text-sm text-white shadow-lg hover:bg-blue-900 xs:text-base"
          >
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
};
