import { Rating } from "@mui/material";
import { useState } from "react";

import { Spinner } from "@/components/ui/spinner";

import { useCheckReviewEligibilityQuery } from "../api/check-review-eligibility";
import {
  RatingDistribution,
  ReviewType,
  useGetProductReviewsQuery,
} from "../api/get-product-reviews";

import { Review } from "./review";
import { ReviewForm } from "./review-form";

interface ReviewsTabProps {
  productId: number;
}

export const ReviewsTab = ({ productId }: ReviewsTabProps) => {
  const { data: productReviews, isLoading: isReviewsLoading } = useGetProductReviewsQuery(44);
  const { data: canReview, isLoading: isCheckingEligibility } = useCheckReviewEligibilityQuery(44);

  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 6;

  const toggleRating = (rating: number) => {
    const newRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter((r: number) => r !== rating)
      : [...selectedRatings, rating];
    setSelectedRatings(newRatings);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  // Filter reviews based on selected ratings
  const filteredReviews =
    productReviews?.reviews.filter(
      (review: ReviewType) =>
        selectedRatings.length === 0 || selectedRatings.includes(Number(review.rating)),
    ) || [];

  const pagesCount = Math.ceil(filteredReviews.length / reviewsPerPage);

  return (
    <>
      {isCheckingEligibility ? (
        <Spinner size={16} />
      ) : (
        <ReviewForm canCurrentUserReview={canReview || false} productId={productId} />
      )}

      <section id="rating">
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="noScrollbar flex grow items-center justify-between overflow-x-auto scroll-smooth whitespace-nowrap py-2 sm:grow-0 sm:flex-col sm:justify-start sm:py-0">
            {isReviewsLoading ? (
              <Spinner size={16} />
            ) : (
              productReviews?.ratingsDistribution.map((rating: RatingDistribution) => (
                <button
                  key={rating.review_rating}
                  onClick={() => toggleRating(rating.review_rating)}
                  className={`my-1 flex shrink-0 cursor-pointer items-center pr-2 sm:p-[5px] ${
                    selectedRatings.includes(rating.review_rating)
                      ? "rounded-md border-1 border-gray-500"
                      : "rounded-md border-1 border-transparent"
                  }`}
                >
                  <Rating value={rating.review_rating} precision={1} readOnly size="small" />
                  <p className="text-sm">({rating.count})</p>
                </button>
              ))
            )}
          </div>
          <div className="flex grow flex-col space-y-2">
            {isReviewsLoading ? (
              <Spinner size={16} />
            ) : productReviews?.reviews.length === 0 ? (
              <p className="mb-4 mt-2 italic">This product has no reviews yet.</p>
            ) : filteredReviews.length === 0 ? (
              <p className="mb-4 mt-2 italic">No reviews found for the selected filters.</p>
            ) : (
              <>
                {filteredReviews
                  .slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage)
                  .map((review: ReviewType) => (
                    <Review
                      key={review.id}
                      id={review.id}
                      reviewDate={review.reviewDate}
                      rating={review.rating}
                      comment={review.comment}
                      reviewerInitials={{
                        firstName: review.user.firstName,
                        lastName: review.user.lastName,
                      }}
                    />
                  ))}
                {/* Conditionally render pagination if more than one page is needed */}
                {pagesCount > 1 && (
                  <div className="flex justify-center space-x-2">
                    {Array.from({ length: pagesCount }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index)}
                        className={`rounded px-3 py-1 ${
                          currentPage === index ? "bg-gray-300" : "bg-gray-200"
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
