// hooks/useWishlist.ts
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useFetch } from "@/hooks/use-fetch";
import { displayAlert } from "@/stores/slices/alert-slice";
import { addToWishlist, removeFromWishlist } from "@/stores/slices/wishlist-slice";
import type { RootState } from "@/stores/store";
import { truncateString } from "@/utils/truncate-string";

export const useWishlist = (productId: number, productName: string) => {
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch<any>();
  const { fetchData } = useFetch();
  const navigate = useNavigate();

  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const isWishlisted = useSelector((state: RootState) => state.wishlist.items.includes(productId));

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      navigate("/sign-in");
      return;
    }

    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 100);

    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/products/${productId}/wishlist`,
      "PATCH",
      null,
      true,
    );

    if (!result?.response.ok) return;

    const truncatedName = truncateString(productName, 0, 20);

    if (result.data.action === "added") {
      dispatch(addToWishlist(productId));
      dispatch(
        displayAlert({
          type: "success",
          message: `${truncatedName} has been added to your wishlist`,
          autoHide: true,
        }),
      );
    } else if (result.data.action === "removed") {
      dispatch(removeFromWishlist(productId));
      dispatch(
        displayAlert({
          type: "info",
          message: `${truncatedName} has been removed from your wishlist!`,
          autoHide: true,
        }),
      );
    }
  };

  return { isWishlisted, isClicked, handleWishlistToggle };
};
