import { Tab, Tabs, Rating } from "@mui/material";
import React, { useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Await } from "react-router-dom";

import { setActiveTab } from "@/stores/slices/ui-slice";
import { RootState } from "@/stores/store";

import { ReviewType, ReviewsProps } from "./models";
import { Review } from "./reviews/review";
import { ReviewForm } from "./reviews/review-form";

interface TabPanelProps {
  children?: React.ReactNode;
  id: string;
  index: number;
  value: number;
  className?: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, id, index, className } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={id} aria-labelledby={`${id}-tab`}>
      {value === index && <div className={className}>{children}</div>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export const ProductTabs = ({
  productDescription,
  canCurrentUserReview,
  reviews,
  productId,
  ratingsDistribution,
}: {
  productDescription: string[];
  canCurrentUserReview: Promise<boolean>;
  reviews: Promise<ReviewsProps>;
  productId: string;
  ratingsDistribution: any;
}) => {
  const [selectedRatings, setSelectedRatings] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0); // Pagination state
  const reviewsPerPage = 6; // Max number of reviews per page

  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.ui.activeTab); // Access the activeTab state from ui slice

  const handleChange = (event: any, newValue: number) => {
    dispatch(setActiveTab(newValue)); // Dispatch action to change the active tab
  };

  const toggleRating = (rating: number) => {
    const newRatings = selectedRatings.includes(rating)
      ? selectedRatings.filter((r: number) => r !== rating)
      : [...selectedRatings, rating];
    setSelectedRatings(newRatings);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="pb-2">
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="product tabs"
        variant="scrollable"
        scrollButtons={false}
      >
        <Tab label="Product Description" {...a11yProps(0)} />
        <Tab label="Reviews" {...a11yProps(1)} />
        <Tab label="Payment Options" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0} id={"productDescription"} className="mt-2 font-normal">
        <ul>
          {productDescription.map((bulletPoint: string, index: number) => (
            <li className="mb-2" key={index}>
              - {bulletPoint}
            </li>
          ))}
        </ul>
      </TabPanel>
      <TabPanel value={value} index={1} id={"reviews"} className="sm:mt-2">
        <Suspense fallback={<div>Loading...</div>}>
          <Await resolve={canCurrentUserReview}>
            {(userReviewEligibility) => (
              <ReviewForm canCurrentUserReview={userReviewEligibility} productId={productId} />
            )}
          </Await>

          <section id="rating">
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <div className="noScrollbar flex grow items-center justify-between overflow-x-auto scroll-smooth whitespace-nowrap py-2 sm:grow-0 sm:flex-col sm:justify-start sm:py-0">
                {ratingsDistribution.map((rating: any) => (
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
                ))}
              </div>
              <div className="flex grow flex-col space-y-2">
                <Await resolve={reviews}>
                  {(resolvedReviews) => {
                    const filteredReviews = resolvedReviews.filter(
                      (review: ReviewType) =>
                        selectedRatings.length === 0 || selectedRatings.includes(review.rating),
                    );
                    const pagesCount = Math.ceil(filteredReviews.length / reviewsPerPage);

                    if (resolvedReviews.length === 0) {
                      // No reviews at all for this product
                      return <p className="mb-4 mt-2 italic">This product has no reviews yet.</p>;
                    } else if (filteredReviews.length === 0) {
                      // No reviews match the selected filters
                      return (
                        <p className="mb-4 mt-2 italic">
                          No reviews found for the selected filters.
                        </p>
                      );
                    } else {
                      // Some reviews match the filters
                      return (
                        <>
                          {filteredReviews
                            .slice(currentPage * reviewsPerPage, (currentPage + 1) * reviewsPerPage)
                            .map((review: any) => (
                              <Review
                                key={review.id}
                                id={review.id}
                                reviewDate={review.reviewDate}
                                rating={review.rating}
                                comment={review.comment}
                                reviewerInitials={review.user}
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
                      );
                    }
                  }}
                </Await>
              </div>
            </div>
          </section>
        </Suspense>
      </TabPanel>
      <TabPanel value={value} index={2} id={"paymentOptions"} className="mt-4">
        <p className="pl-4 italic">None of the products on this website are for sale.</p>
      </TabPanel>
    </div>
  );
};
