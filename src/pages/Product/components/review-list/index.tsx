import { Reviews } from "@Product/models";
import Review from "./Review";

const Reviews = ({ reviews }: Reviews) => {
  return (
    <>
      {reviews.map((review) => (
        <Review
          review={review.review}
          date={review.date}
          rating={review.rating}
        />
      ))}
    </>
  );
};

export default Reviews;
