import React, { useState, Suspense, useEffect } from 'react';
import { Tab, Tabs, Box, Typography, Rating } from '@mui/material';
import { Await } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import Review from './Review';
import { ReviewType, ReviewsProps } from './models';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/setup/store';
import { setActiveTab } from '@/setup/slices/ui-slice';

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
        <div
            role="tabpanel"
            hidden={value !== index}
            id={id}
            aria-labelledby={`${id}-tab`}
        >
            {value === index && (
                <div className={className}>
                    <Typography>{children}</Typography>
                </div>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}



const ProductTabs = ({ productDescription, canCurrentUserReview, reviews, productId, ratingsDistribution }: {
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
    const value = useSelector((state: RootState) => state.ui.activeTab);  // Access the activeTab state from ui slice
  
    const handleChange = (event: any, newValue: number) => {
      dispatch(setActiveTab(newValue));  // Dispatch action to change the active tab
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
        <div className='pb-2'>
            <Tabs value={value} onChange={handleChange} aria-label="product tabs" variant='scrollable' scrollButtons={false}>
                <Tab label="Product Description" {...a11yProps(0)} />
                <Tab label="Reviews" {...a11yProps(1)} />
                <Tab label="Payment Options" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0} id={"productDescription"} className='mt-2'>
                <ul>
                    {productDescription.map((bulletPoint: string, index: number) => (
                        <li className="mb-2" key={index}>
                            - {bulletPoint}
                        </li>
                    ))}
                </ul>
            </TabPanel>
            <TabPanel value={value} index={1} id={"reviews"} className='sm:mt-2'>
                <Suspense fallback={<div>Loading...</div>}>
                    <Await
                        resolve={canCurrentUserReview}
                        children={(resolvedCanCurrentUserReview) => (
                            <ReviewForm
                                canCurrentUserReview={resolvedCanCurrentUserReview}
                                productId={productId}
                            />
                        )}
                    />
                    <section id="rating">
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <div className="flex sm:flex-col items-center justify-between sm:justify-start overflow-x-auto whitespace-nowrap scroll-snap-type-x-mandatory noScrollbar scroll-smooth flex-grow sm:grow-0 py-2 sm:py-0">
                                {ratingsDistribution.map((rating: any) => (
                                    <div key={rating.review_rating}
                                        onClick={() => toggleRating(rating.review_rating)}
                                        className={`flex cursor-pointer items-center flex-shrink-0 scroll-snap-align-start my-1 pr-2 sm:p-[5px] ${selectedRatings.includes(rating.review_rating) ? 'border-1 border-gray-500 rounded-md' : 'border-1 border-transparent rounded-md'}`}>
                                        <Rating
                                            value={rating.review_rating}
                                            precision={1}
                                            readOnly
                                            size='small'
                                        />
                                        <p className='text-sm'>({rating.count})</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col grow space-y-2">
                                <Await resolve={reviews}>
                                    {resolvedReviews => {
                                        const filteredReviews = resolvedReviews.filter((review: ReviewType) => selectedRatings.length === 0 || selectedRatings.includes(review.rating));
                                        const pagesCount = Math.ceil(filteredReviews.length / reviewsPerPage);

                                        if (resolvedReviews.length === 0) {
                                            // No reviews at all for this product
                                            return <p className="italic mt-2 mb-4">This product has no reviews yet.</p>;
                                        } else if (filteredReviews.length === 0) {
                                            // No reviews match the selected filters
                                            return <p className="italic mt-2 mb-4">No reviews found for the selected filters.</p>;
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
                                                        ))
                                                    }
                                                    {/* Conditionally render pagination if more than one page is needed */}
                                                    {pagesCount > 1 && (
                                                        <div className="flex justify-center space-x-2">
                                                            {Array.from({ length: pagesCount }, (_, index) => (
                                                                <button key={index} onClick={() => handlePageChange(index)}
                                                                    className={`py-1 px-3 rounded ${currentPage === index ? 'bg-gray-300' : 'bg-gray-200'}`}>
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
            <TabPanel value={value} index={2} id={"paymentOptions"} className='mt-4'>
                <p className='italic pl-4'>None of the products on this website are for sale.</p>
            </TabPanel>
        </div>
    );
};

export default ProductTabs;
