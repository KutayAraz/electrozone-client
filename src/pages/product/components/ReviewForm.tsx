import CustomizableModal from "@/common/Modal/CustomizableModal";
import StarIcon from "@mui/icons-material/Star";
import { Box, Rating } from "@mui/material";
import { useRef, useState } from "react";
import useFetch from "@/common/Hooks/use-fetch";
import { useDispatch } from "react-redux";
import { displayAlert } from "@/setup/slices/alert-slice";
import { ReactComponent as CloseButton } from "@assets/svg/close-button.svg";

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

const ReviewForm = ({ canCurrentUserReview, productId }: ReviewFormProps) => {
  const [reviewForm, setReviewForm] = useState<boolean>(false);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [hover, setHover] = useState(-1);
  const review = useRef<HTMLTextAreaElement>(null);
  const { fetchData, isLoading } = useFetch();
  const dispatch = useDispatch<any>();

  const handleSubmitReview = async (event: React.FormEvent) => {
    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/reviews/${productId}/review`,
      "POST",
      { rating: ratingValue, comment: review.current?.value },
      true
    );

    if (result?.response.ok) {
      dispatch(
        displayAlert({
          type: "success",
          message:
            "Your review has been added. Thank you for your review.",
          autoHide: true,
        })
      );
      setReviewForm(false);
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
        transitionDuration={300}
        widthClass="w-[90%] md:w-[50%] lg:w-[30%]"
        heightClass="h-[72]"
        topClass="top-[35%]"
        leftClass="left-[5%] md:left-[25%] lg:left-[35%]"
        isOpen={reviewForm}
        onClose={() => setReviewForm(false)}
        className="rounded-xl noScrollbar"
      >
        <CloseButton
          className="absolute top-4 right-4 cursor-pointer w-6 h-6 stroke-gray-500"
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
            autoFocus
          />
          <button
            type="button"
            className={`mt-4 ${
              isLoading("default") ? "bg-gray-600" : "bg-theme-blue"
            } hover:bg-blue-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline`}
            onClick={handleSubmitReview}
            disabled={isLoading("default")}
          >
            {isLoading("default") ? "Submitting" : "Submit Review"}
          </button>
        </div>
      </CustomizableModal>
    </div>
  );
};

export default ReviewForm;
