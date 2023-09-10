import { store } from "@/setup/store";
import fetchNewAccessToken from "@/utils/fetch-access-token";
import { Rating } from "@mui/material";
import { useRef, useState } from "react";

interface ReviewFormProps {
  canCurrentUserReview: boolean;
  productId: string;
}

const ReviewForm = ({ canCurrentUserReview, productId }: ReviewFormProps) => {
  const [reviewForm, setReviewForm] = useState<boolean>(false);
  const [ratingValue, setRatingValue] = useState<number | null>(0); // Rating component might have null as a value
  const review = useRef<HTMLInputElement>(null);

  const toggleReviewForm = () => {
    setReviewForm(true);
  };

  const handleRatingChange = (
    event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    setRatingValue(newValue);
  };

  const handleSubmitReview = async (event: React.FormEvent) => {
    let accessToken = store.getState().auth.accessToken;

    if (!accessToken) {
      accessToken = await fetchNewAccessToken();
    }

    const data = await fetch(
      `${import.meta.env.VITE_API_URL}/reviews/${productId}/review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          rating: ratingValue,
          comment: review.current?.value,
        }),
      }
    );

    if (data.ok) {
      window.alert(data);
    }
  };

  return (
    <div className="max-w-screen-lg flex flex-col mx-auto text-center">
      {canCurrentUserReview && (
        <button onClick={toggleReviewForm} className="text-center mx-auto">Leave a review</button>
      )}
      {reviewForm && (
        <form onSubmit={handleSubmitReview}>
          <Rating
            name="user-rating"
            value={ratingValue}
            onChange={handleRatingChange}
            precision={1}
          />
          <input
            ref={review}
            type="text"
            minLength={15}
            maxLength={250}
            placeholder="Leave your review here"
            className="block border-2 mx-auto text-center"
          />
          <button type="submit">Submit Review</button>
        </form>
      )}
    </div>
  );
};

export default ReviewForm;
