import { useNavigate } from "react-router-dom";

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
      // Save current product in sessionStorage to potentially handle post-login actions
      sessionStorage.setItem("pendingWishlistItem", productId.toString());

      // Redirect to login page
      navigate("/auth/login");
      return;
    }

    try {
      const result = await toggleWishlist(productId).unwrap();

      // Optionally update local state immediately for better UX
      if (result.action === "added") {
        dispatch(addToWishlist(productId));
      } else if (result.action === "removed") {
        dispatch(removeFromWishlist(productId));
      }
    } catch (error) {
      console.error("Failed to toggle wishlist", error);
    }
  };

  return { handleToggleWishlist, isLoading };
};
