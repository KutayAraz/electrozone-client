import { Link } from "react-router-dom";
import { ReactComponent as HeartIcon } from "@assets/svg/wishlist-heart.svg";
import { useState } from "react";
import { Rating } from "@mui/material";
import { WishlistProductCardProps } from "./types";

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

  const handleWishlistButtonClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 100);

    setTimeout(() => {
      onRemoveFromWishlist(id);
    }, 300);
  };

  return (
    <div className="border-1 rounded-md mx-2 my-2 p-1 flex flex-col space-x-2 relative group">
      <div className="flex justify-between items-start mb-2">
        <button
          onClick={handleWishlistButtonClick}
          className="transition-transform duration-300 transform scale-100 group-hover:scale-110 ml-auto"
        >
          <HeartIcon
            className={`w-10 h-auto inline-block ${
              isClicked ? "transform scale-125" : ""
            }`}
            fill={"#febd69"}
          />
        </button>
      </div>

      <Link to={`/${category}/${subcategory}/${id}`} className="block mb-2">
        <img
          src={thumbnail}
          alt={`thumbnail image for ${productName}`}
          className="w-auto h-32 object-contain mx-auto"
        />
      </Link>

      <Link to={`/${category}/${subcategory}/${id}`} className="space-y-2">
        <p>{productName}</p>
        <p>{brand}</p>
        <Rating
          name="half-rating-read"
          value={averageRating}
          precision={0.1}
          readOnly
        />
        <p>$ {price.toFixed(2)}</p>
        {stock < 1 && (
          <p className="text-red-500 italic">Product out of stock</p>
        )}
        <button
          onClick={handleAddToCartClick}
          className={`bg-theme-blue text-white p-[0.25rem] ${
            isAddToCartClicked ? "bg-blue-600" : "bg-theme-blue"
          } rounded-lg w-full text-center`}
        >
          Add to Cart
        </button>
      </Link>
    </div>
  );
};

export default WishlistProductCard;
