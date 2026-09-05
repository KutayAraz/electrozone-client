import StarIcon from "@mui/icons-material/Star";
import { Box, Rating } from "@mui/material";
import { useRef, useState } from "react";

import { CustomModal } from "@/components/ui/custom-modal";
import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import CloseButton from "@assets/svgs/close-button.svg?react";

import { ratingDescriptions } from "../constants/rating-descriptions";
import { useCreateReview } from "../hooks/useCreateReview";
import { getLabelText } from "../utils/get-label-text";

type ReviewFormProps = {
  canCurrentUserReview: boolean;
  productId: number;
};

export const ReviewForm = ({ canCurrentUserReview, productId }: ReviewFormProps) => {
  const dispatch = useAppDispatch();
  const { submitReview, isLoading: isCreatingReview } = useCreateReview();

  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const [hover, setHover] = useState(-1);

  const reviewRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmitReview = async () => {
    if (!ratingValue) {
      dispatch(
        displayNotification({
          type: NotificationType.ERROR,
          message: "Please select a rating",
        }),
      );

      return;
    }

    // Keep the form open with the user's text if the request fails
    if (!(await submitReview(productId, ratingValue, reviewRef.current?.value))) return;

    setRatingValue(null);
    setIsFormOpen(false);
  };

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col text-center">
      {canCurrentUserReview && (
        <button
          onClick={() => setIsFormOpen(true)}
          className="mx-auto my-2 rounded-md bg-theme-blue p-2 text-center text-white hover:bg-blue-900"
        >
          Leave a review
        </button>
      )}

      <CustomModal
        placement="center"
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        className="noScrollbar w-[90%] overflow-y-auto rounded-xl md:w-[50%] lg:w-[30%]"
        ariaLabel="Review Form Modal"
      >
        <CloseButton
          className="absolute right-4 top-4 size-6 cursor-pointer stroke-gray-500"
          onClick={() => setIsFormOpen(false)}
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
            ref={reviewRef}
            minLength={15}
            maxLength={250}
            placeholder="Leave your review here"
            className="mx-auto mt-6 block h-32 w-full resize-none rounded-lg border-1 border-theme-blue p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            className={`mt-4 ${
              isCreatingReview ? "bg-gray-600" : "bg-theme-blue"
            } rounded-lg px-4 py-2 text-white hover:bg-blue-700 focus:outline-none`}
            onClick={handleSubmitReview}
            disabled={isCreatingReview}
          >
            {isCreatingReview ? "Submitting" : "Submit Review"}
          </button>
        </div>
      </CustomModal>
    </div>
  );
};
