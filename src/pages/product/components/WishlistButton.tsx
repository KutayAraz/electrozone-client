import React, { useState } from "react";
import { ReactComponent as HeartIcon } from "@assets/svg/wishlist-heart.svg";

type WishlistButtonProps = {
  isWishlisted: boolean;
  toggleWishlist: () => void;
};

const WishlistButton = React.memo(
  ({ isWishlisted, toggleWishlist }: WishlistButtonProps) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
      toggleWishlist();
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 300); // reset after 300ms
    };

    return (
      <div className="flex">
        <button onClick={handleClick}>
          <HeartIcon
            className={`w-8 h-8 inline-block transition-transform duration-300 ${
              isClicked ? "transform scale-125" : ""
            } `}
            fill={`${isWishlisted ? "#febd69" : "#ffffff"}`}
          />
          {isWishlisted ? "Remove from wishlist" : "Add to Wishlist"}
        </button>
      </div>
    );
  }
);

export default WishlistButton;
