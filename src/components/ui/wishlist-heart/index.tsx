import { useState } from "react";

import HeartIcon from "@assets/svgs/wishlist-heart.svg?react";

interface WishlistHeartProps {
  isWishlisted: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
}

export const WishlistHeart = ({ isWishlisted, onClick, className = "" }: WishlistHeartProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Handle animation
    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 100);

    // Trigger the parent's onClick handler
    onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className={`scale-100 transition-transform duration-300 group-hover:scale-110 ${className}`}
    >
      <HeartIcon
        className={`inline-block h-auto w-6 hover:scale-125 ${isClicked ? "scale-125" : ""}`}
        fill={`${isWishlisted ? "#febd69" : "#ffffff"}`}
      />
    </button>
  );
};
