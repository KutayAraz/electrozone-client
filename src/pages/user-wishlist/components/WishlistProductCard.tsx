import { Link } from "react-router-dom";
import { ReactComponent as HeartIcon } from "@assets/svg/wishlist-heart.svg";
import { useState } from "react";
import { Divider, Rating } from "@mui/material";
import { WishlistProductCardProps } from "./models";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/setup/store";
import useFetch from "@/common/Hooks/use-fetch";
import { displayAlert } from "@/setup/slices/alert-slice";
import { addItemToCart } from "@/setup/slices/localCart-slice";
import { updateCartItemCount } from "@/setup/slices/user-slice";
import { ref } from "yup";
import { truncateString } from "@/utils/truncate-string";

const WishlistProductCard = ({
  id,
  productName,
  brand,
  thumbnail,
  price,
  averageRating,
  stock,
  subcategory,
  category,
  onAddToCart,
  onRemoveFromWishlist,
}: WishlistProductCardProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isAddToCartClicked, setIsAddToCartClicked] = useState(false);

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
        "addToCart"
      );
      if (result?.response.ok)
        dispatch(
          updateCartItemCount({ cartItemCount: result.data.totalQuantity })
        );
    } else {
      dispatch(addItemToCart({ id, quantity: 1 }));
    }

    dispatch(
      displayAlert({
        type: "success",
        message: `${truncateString(productName, 0, 20)} has been added to your cart!`,
        autoHide: true,
      })
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
    <div className="w-full xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-2 text-center items-center mb-3"
    >
      <Link
        to={`/category/${category + "/" + subcategory + "/" + id}`}
        className="border-1 border-gray-300 rounded-md shadow-md hover:bg-gray-100 h-full px-2 xs:px-4 py-2 xs:pt-4 pb-2 flex xs:flex-col xs:justify-between"
      >

        <div className="ml-auto text-right pr-1">
          <button
            onClick={handleWishlistButtonClick}
            aria-label="Remove from wishlist"
            className="transition-transform duration-300 transform scale-100 group-hover:scale-110"
          >
            <HeartIcon
              className={`w-8 h-auto inline-block hover:scale-125 ${isClicked ? "transform scale-125" : ""
                }`}
              fill={"#febd69"}
            />
          </button>
        </div>
        <div className="flex-1 px-2 xs:px-0 ">
          <img
            src={thumbnail}
            alt={`image for ${productName}`}
            className="min-w-[100px] w-56 h-56 xs:w-auto xs:h-[256px] object-contain mx-auto"
          />
        </div>
        <div className="xs:mt-2 flex-1 flex flex-col px-2 xs:px-0 my-auto space-y-2 justify-between">
          <Divider
            orientation="vertical"
            className="self-stretch xs:hidden m-2"
          />
          <Divider className="self-stretch hidden xs:block" />
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
            className="border-2 p-[0.3rem] max-w-[80%] mx-auto w-full bg-theme-blue text-white rounded-lg shadow-lg text-sm xs:text-base hover:bg-blue-900"
          >
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
};

export default WishlistProductCard;
