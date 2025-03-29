import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useCreateReviewMutation } from "../api/create-review";

export const useCreateReview = () => {
  const dispatch = useAppDispatch();
  const [createReview] = useCreateReviewMutation();

  const submitReview = async (productId: number, rating: number, comment: string) => {
    try {
      await createReview({ productId, review: { rating, comment } }).unwrap();

      dispatch(
        displayNotification({
          type: NotificationType.SUCCESS,
          message: "Review has been added",
        }),
      );
    } catch (error: any) {
      dispatch(
        displayNotification({
          type: NotificationType.ERROR,
          message: "An error occured while adding your review",
          details: error.message,
        }),
      );
    }
  };

  return submitReview;
};
