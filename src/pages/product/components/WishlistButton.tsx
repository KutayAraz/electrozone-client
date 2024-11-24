import { useState } from "react";
import { ReactComponent as HeartIcon } from "@assets/svg/wishlist-heart.svg";
import { WishlistButtonProps } from "./models";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/stores/store";
import useFetch from "@/hooks/use-fetch";
import { useDispatch, useSelector } from "react-redux";
import { displayAlert } from "@/stores/slices/alert-slice";
import { truncateString } from "@/utils/truncate-string";

const WishlistButton = ({ productId, isInitiallyWishlisted, productName }: WishlistButtonProps) => {
  const [isWishlisted, setIsWishlisted] = useState(isInitiallyWishlisted);
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const navigate = useNavigate();
  const { fetchData } = useFetch();
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch<any>();

  const handleClick = () => {
    toggleWishlist();
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 300);
  };

  const toggleWishlist = async () => {
    if (!isSignedIn) {
      return navigate("/sign-in", { state: { from: location.pathname } });
    }
    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/wishlist/${productId}`,
      "PATCH",
      null,
      true,
      false,
      "wishlist"
    );

    if (result?.response.ok) {
      if (result.data.action === "added") {
        setIsWishlisted(true);
        dispatch(
          displayAlert({
            type: "success",
            message: `${truncateString(productName, 0, 20)} has been added to your wishlist!`,
            autoHide: true,
          })
        );
      } else if (result.data.action === "removed") {
        setIsWishlisted(false);
        dispatch(
          displayAlert({
            type: "info",
            message: `${truncateString(productName, 0, 20)} has been removed to your wishlist!`,
            autoHide: true,
          })
        );
      }
    }
  };

  return (
    <button onClick={handleClick}>
      <div className="flex items-center">
        <HeartIcon
          className={`w-8 h-8 inline-block transition-transform duration-300 ${isClicked ? "transform scale-125" : ""
            } `}
          fill={`${isWishlisted ? "#febd69" : "#ffffff"}`}
        />
        {isWishlisted ? "Remove from wishlist" : "Add to Wishlist"}
      </div>
    </button>
  );
};

// const WishlistButton = ({
//   isWishlisted,
//   toggleWishlist,
// }: WishlistButtonProps) => {
//   const [isClicked, setIsClicked] = useState(false);

//   const handleClick = () => {
//     toggleWishlist();
//     setIsClicked(true);
//     setTimeout(() => setIsClicked(false), 300);
//   };

//   return (
//     <div className="flex">
//       <button onClick={handleClick}>
//         <HeartIcon
//           className={`w-8 h-8 inline-block transition-transform duration-300 ${isClicked ? "transform scale-125" : ""
//             } `}
//           fill={`${isWishlisted ? "#febd69" : "#ffffff"}`}
//         />
//         {isWishlisted ? "Remove from wishlist" : "Add to Wishlist"}
//       </button>
//     </div>
//   );
// };

export default WishlistButton;
