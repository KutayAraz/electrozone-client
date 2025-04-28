import HeartIcon from "@assets/svgs/wishlist-heart.svg?react";
import { useEffect, useState } from "react";
import styles from "./wishlist-heart.module.css";

interface WishlistHeartProps {
  isWishlisted: boolean;
  onClick: (e: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
}

export const WishlistHeart = ({
  isWishlisted,
  onClick,
  className = "",
  disabled = false,
}: WishlistHeartProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevWishlisted, setPrevWishlisted] = useState(isWishlisted);

  useEffect(() => {
    // Trigger animation when wishlist state changes
    if (prevWishlisted !== isWishlisted) {
      setIsAnimating(true);
      const timeout = setTimeout(() => {
        setIsAnimating(false);
      }, 600);
      return () => clearTimeout(timeout);
    }
    setPrevWishlisted(isWishlisted);
  }, [isWishlisted, prevWishlisted]);

  const handleClick = (e: React.MouseEvent) => {
    if (disabled) return;

    e.preventDefault();
    e.stopPropagation();

    // Add initial animation on click
    setIsAnimating(true);

    // Trigger the parent's onClick handler
    onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      className={`relative scale-100 transition-transform duration-300 group-hover:scale-110 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      } ${className}`}
    >
      {isAnimating && isWishlisted && (
        <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-theme-orange)] opacity-50"></span>
      )}
      <div className="inline-flex h-6 w-6 items-center justify-center">
        {disabled ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></span>
        ) : (
          <HeartIcon
            className={`h-full w-full transition-all duration-300 ${
              isAnimating ? (isWishlisted ? styles.animateHeartbeat : styles.animateHeartbreak) : ""
            }`}
            fill={isWishlisted ? "var(--color-theme-orange)" : "#ffffff"}
          />
        )}
      </div>
    </button>
  );
};
