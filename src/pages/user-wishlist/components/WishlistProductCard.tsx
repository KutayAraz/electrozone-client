import { Link } from "react-router-dom";
import { ReactComponent as HeartIcon } from "@assets/svg/wishlist-heart.svg";
import { useState } from "react";
import { Divider, Rating } from "@mui/material";
import { WishlistProductCardProps } from "./models";

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

  const handleAddToCartClick = (e: React.MouseEvent) => {

    setIsAddToCartClicked(true);
    onAddToCart(id, e);
    setTimeout(() => setIsAddToCartClicked(false), 150);
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
    <div className="w-full xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xs:px-2 text-center items-center my-2 relative">
      <div className="border-1 border-gray-300 rounded-md shadow-md hover:bg-gray-100 ">
        <div className="ml-auto text-right pr-2">
          <button
            onClick={handleWishlistButtonClick}
            aria-label="Remove from wishlist"
            className="transition-transform duration-300 transform scale-100 group-hover:scale-110"
          >
            <HeartIcon
              className={`w-10 h-auto inline-block ${isClicked ? "transform scale-125" : ""
                }`}
              fill={"#febd69"}
            />
          </button>
        </div>
        <Link
          to={`/category/${category + "/" + subcategory + "/" + id}`}
          className="h-full px-2 xs:px-4  xs:pt-4 pb-2 flex xs:flex-col xs:justify-between"
        >
          {/* Wishlist button */}

          <div className="flex-1 px-2 xs:px-0">
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

            <p>$ {price.toFixed(2)}</p>
            <button
              onClick={handleAddToCartClick}
              className="border-2 p-[0.3rem] max-w-[80%] mx-auto w-full bg-theme-blue text-white rounded-lg shadow-lg text-sm xs:text-base hover:bg-blue-900"
            >
              Add to Cart
            </button>
          </div>
        </Link>
      </div>
    </div>

  );
};

export default WishlistProductCard;
