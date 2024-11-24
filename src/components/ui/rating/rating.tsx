type RatingProps = {
  rating: number;
}

export const Rating = ({ rating }: RatingProps) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={i}
        viewBox="0 0 24 24"
        fill={i <= rating ? 'yellow' : 'none'}
        stroke={i <= rating ? 'yellow' : 'gray'}
        strokeWidth={1}
        width={20}
        height={20}
      >
        <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />
      </svg>
    );
  }

  return (
    <div>
      {stars}
    </div>
  );

};
