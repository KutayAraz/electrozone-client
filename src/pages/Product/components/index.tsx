import { ReviewType, ReviewsProps } from "@pages/product/models";
import Review from "./review-list/Review";

const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <>
      {reviews.map((review: ReviewType, index: number) => (
        <Review
          key={index}
          reviewDate={review.reviewDate}
          rating={review.rating}
          comment={review.comment}
        />
      ))}
    </>
  );
};

export default Reviews;
