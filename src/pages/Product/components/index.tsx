import { ReviewType } from "@pages/product/models";
import Review from "./review-list/Review";
import { useLoaderData } from "react-router-dom";

const Reviews = () => {
  const { reviews } = useLoaderData() as { reviews: ReviewType[] };
  return (
    <>
      {reviews.map((review: ReviewType) => (
        <Review
          date={review.date}
          rating={review.rating}
          comment={review.comment}
        />
      ))}
    </>
  );
};

export default Reviews;
