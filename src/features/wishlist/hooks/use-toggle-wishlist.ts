import { useNavigate } from "react-router-dom";

import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { paths } from "@/config/paths";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useAppSelector } from "@/hooks/use-app-selector";
import { selectIsAuthenticated } from "@/stores/slices/user-slice";
import { addToWishlist, removeFromWishlist } from "@/stores/slices/wishlist-slice";

import { useToggleWishlistMutation } from "../api/toggle-wishlist";

export const useToggleWishlist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const [toggleWishlist, { isLoading }] = useToggleWishlistMutation();

  const handleToggleWishlist = async (productId: number) => {
    if (!isAuthenticated) {
      // Redirect to login page
      navigate(paths.auth.login.path);
      return;
    }

    try {
      const result = await toggleWishlist(productId).unwrap();

      if (result.action === "added") {
        dispatch(addToWishlist(productId));
      } else if (result.action === "removed") {
        dispatch(removeFromWishlist(productId));
      }
      dispatch(
        displayNotification({
          type: NotificationType.SUCCESS,
          message: `Product has been ${
            result.action === "added" ? "added to your wishlist" : "removed from your wishlist"
          }`,
        }),
      );
    } catch (error) {
      console.error("Failed to toggle wishlist", error);
    }
  };

  return { handleToggleWishlist, isLoading };
};
