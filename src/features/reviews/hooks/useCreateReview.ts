import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";

import { useCreateReviewMutation } from "../api/create-review";

export const useCreateReview = () => {
  const dispatch = useAppDispatch();

  const [createReview, { isLoading }] = useCreateReviewMutation();

  const submitReview = async (productId: number, rating: number, comment?: string) => {
    // Only include the comment if it has content (not empty string)
    const reviewData = {
      rating,
      ...(comment?.trim() ? { comment: comment.trim() } : {}),
    };

    let response;
    try {
      response = await createReview({ productId, review: reviewData }).unwrap();
    } catch {
      return false;
    }

    dispatch(
      displayNotification({
        type: NotificationType.SUCCESS,
        message: "Review has been added",
        details: `New rating after you review: ${response}`,
      }),
    );

    return true;
  };

  return { submitReview, isLoading };
};
