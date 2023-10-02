import CustomizableModal from "@/common/Modal/CustomizableModal";
import StarIcon from "@mui/icons-material/Star";
import { store } from "@/setup/store";
import fetchNewAccessToken from "@/utils/fetch-access-token";
import { Box, Rating } from "@mui/material";
import { useRef, useState } from "react";

interface ReviewFormProps {
  canCurrentUserReview: boolean;
  productId: string;
}

const ratingDescriptions: { [key: number]: string } = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${ratingDescriptions[value]}`;
}

const ReviewForm = ({ canCurrentUserReview, productId }: ReviewFormProps) => {
  const [reviewForm, setReviewForm] = useState<boolean>(false);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [hover, setHover] = useState(-1);
  const review = useRef<HTMLTextAreaElement>(null);

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
        <button
          onClick={() => setReviewForm(true)}
          className="text-center mx-auto bg-theme-blue rounded-md text-white p-2 hover:bg-blue-900 my-2"
        >
          Leave a review
        </button>
      )}
      <CustomizableModal
        direction="center"
        transitionType="slide"
        transitionDuration={400}
        width="90vw"
        height="auto"
        isOpen={reviewForm}
        onClose={() => setReviewForm(false)}
        className="rounded-xl "
      >
        <form onSubmit={handleSubmitReview} className="p-4">
          <Rating
            name="user-rating"
            value={ratingValue}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setRatingValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {ratingValue !== null && (
            <Box
              sx={{
                position: "absolute",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#13193F",
                mt: 1,
              }}
            >
              {ratingDescriptions[hover !== -1 ? hover : ratingValue]}
            </Box>
          )}

          <textarea
            ref={review}
            minLength={15}
            maxLength={250}
            placeholder="Leave your review here"
            className="block w-full h-32 border-1 border-theme-blue rounded-lg mx-auto mt-6 p-2 resize-none shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit Review
          </button>
        </form>
      </CustomizableModal>
    </div>
  );
};

export default ReviewForm;
