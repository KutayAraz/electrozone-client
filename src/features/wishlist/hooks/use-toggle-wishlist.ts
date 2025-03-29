import { selectIsAuthenticated } from "@/stores/slices/user-slice";
import { addToWishlist, removeFromWishlist } from "@/stores/slices/wishlist-slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useToggleWishlistMutation } from "../api/toggle-wishlist";

export const useWishlistToggle = () => {
  const [toggleWishlistApi] = useToggleWishlistMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const handleToggleWishlist = async (productId: number) => {
    if (!isAuthenticated) {
      // Save current product in sessionStorage to potentially handle post-login actions
      sessionStorage.setItem("pendingWishlistItem", productId.toString());

      // Redirect to login page
      navigate("/auth/login");
      return;
    }

    try {
      const result = await toggleWishlistApi(productId);

      // Optionally update local state immediately for better UX
      if (result.data?.action === "added") {
        dispatch(addToWishlist(productId));
      } else if (result.data?.action === "removed") {
        dispatch(removeFromWishlist(productId));
      }
    } catch (error) {
      console.error("Failed to toggle wishlist", error);
    }
  };

  return handleToggleWishlist;
};
