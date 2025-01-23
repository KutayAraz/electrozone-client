import { useMemo } from "react";

interface RatingProps {
  rating: number;
  size?: number;
  activeColor?: string;
  inactiveColor?: string;
  className?: string;
}

export const Rating = ({
  rating: rawRating,
  size = 20,
  activeColor = "#FFD700",
  inactiveColor = "#D1D5DB",
  className,
}: RatingProps) => {
  // Clamp rating between 0 and 5
  const rating = Math.min(Math.max(rawRating, 0), 5);

  const stars = useMemo(() => {
    return Array.from({ length: 5 }, (_, index) => {
      const isFilled = index + 1 <= rating;

      return (
        <svg
          key={index}
          viewBox="0 0 24 24"
          width={size}
          height={size}
          fill={isFilled ? activeColor : "none"}
          stroke={isFilled ? activeColor : inactiveColor}
          strokeWidth={1}
          aria-hidden="true"
        >
          <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />
        </svg>
      );
    });
  }, [rating, size, activeColor, inactiveColor]);

  return (
    <div
      className={`inline-flex ${className || ""}`}
      role="img"
      aria-label={`Rating: ${rating.toFixed(1)} out of 5 stars`}
    >
      {stars}
    </div>
  );
};
