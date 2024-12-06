import StarIcon from "@mui/icons-material/Star";
import { Box, Rating } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { CustomModal } from "@/components/ui/modal/custom-modal";
import { useFetch } from "@/hooks/use-fetch";
import { displayAlert } from "@/stores/slices/alert-slice";
import { ReactComponent as CloseButton } from "@assets/svgs/close-button.svg";

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

const getLabelText = (value: number) => {
  return `${value} Star${value !== 1 ? "s" : ""}, ${ratingDescriptions[value]}`;
};

export const ReviewForm = ({ canCurrentUserReview, productId }: ReviewFormProps) => {
  const [reviewForm, setReviewForm] = useState<boolean>(false);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [hover, setHover] = useState(-1);
  const review = useRef<HTMLTextAreaElement>(null);
  const { fetchData, isLoading } = useFetch();
  const dispatch = useDispatch<any>();

  const handleSubmitReview = async () => {
    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/reviews/${productId}/review`,
      "POST",
      { rating: ratingValue, comment: review.current?.value },
      true,
    );

    if (result?.response.ok) {
      dispatch(
        displayAlert({
          type: "success",
          message: "Your review has been added. Thank you for your review.",
          autoHide: true,
        }),
      );
      setReviewForm(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col text-center">
      {canCurrentUserReview && (
        <button
          onClick={() => setReviewForm(true)}
          className="mx-auto my-2 rounded-md bg-theme-blue p-2 text-center text-white hover:bg-blue-900"
        >
          Leave a review
        </button>
      )}
      <CustomModal
        direction="center"
        transitionType="slide"
        transitionDuration={300}
        widthClass="w-[90%] md:w-[50%] lg:w-[30%]"
        heightClass="h-[72]"
        topClass="top-[35%]"
        leftClass="left-[5%] md:left-[25%] lg:left-[35%]"
        isOpen={reviewForm}
        onClose={() => setReviewForm(false)}
        className="noScrollbar rounded-xl"
        ariaLabel="Review Form Modal"
      >
        <CloseButton
          className="absolute right-4 top-4 size-6 cursor-pointer stroke-gray-500"
          onClick={() => setReviewForm(false)}
        />
        <div className="p-4">
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
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
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
            className="mx-auto mt-6 block h-32 w-full resize-none rounded-lg border-1 border-theme-blue p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          />
          <button
            type="button"
            className={`mt-4 ${
              isLoading("default") ? "bg-gray-600" : "bg-theme-blue"
            } rounded-lg px-4 py-2 text-white hover:bg-blue-700 focus:outline-none`}
            onClick={handleSubmitReview}
            disabled={isLoading("default")}
          >
            {isLoading("default") ? "Submitting" : "Submit Review"}
          </button>
        </div>
      </CustomModal>
    </div>
  );
};
