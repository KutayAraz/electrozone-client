import { Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { SliderProductCardProps } from "./models";
import { ReactComponent as HeartIcon } from "@assets/svg/wishlist-heart.svg";
import { useState } from "react";
import useFetch from "../Hooks/use-fetch";
import { useDispatch, useSelector } from "react-redux";
import { displayAlert } from "@/setup/slices/alert-slice";
import { RootState } from "@/setup/store";
import { addToWishlist, removeFromWishlist } from "@/setup/slices/wishlist-slice";

const SliderProductCard = ({
  id,
  productName,
  brand,
  price,
  thumbnail,
  subcategory,
  category,
}: SliderProductCardProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch<any>();
  const { fetchData } = useFetch();

  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const navigate = useNavigate()

  const wishlist = useSelector((state: RootState) => state.wishlist);
  const isWishlisted = wishlist.items.includes(id);

  const handleWishlistButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsClicked(true);
    setTimeout(() => {
      setIsClicked(false);
    }, 100);

    setTimeout(() => {
      toggleWishlist(id);
    }, 300);
  };

  const toggleWishlist = async (id: number) => {
    if (!isSignedIn) {
      navigate("/sign-in")
    }
    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/products/${id}/wishlist`,
      "PATCH",
      null,
      true
    );

    if (result?.response.ok) {
      if (result.data.action === "added") {
        dispatch(addToWishlist(id))
        dispatch(
          displayAlert({
            type: "success",
            message: "Product has been added to your wishlist!",
            autoHide: true,
          })
        );
      } else if (result.data.action === "removed") {
        dispatch(removeFromWishlist(id))
        dispatch(
          displayAlert({
            type: "success",
            message: "Product has been removed to your wishlist!",
            autoHide: true,
          })
        );
      }

    }
  };
  return (
    <div className="relative mx-[4px] xs:mx-2 sm:mx-3">
      <Link
        to={`/category/${category}/${subcategory}/${id}`}
        className="flex flex-col bg-white items-center p-2 hover:bg-gray-100 border-2 rounded-md shadow-sm"
        key={id}
      >
        <div className="ml-auto text-right pr-1">
          <button
            onClick={handleWishlistButtonClick}
            aria-label="Remove from wishlist"
            className="transition-transform duration-300 transform scale-100 group-hover:scale-110"
          >
            <HeartIcon
              className={`w-6 h-auto inline-block hover:scale-125 ${isClicked ? "transform scale-125" : ""
                }`}
              fill={`${isWishlisted ? "#febd69" : "#ffffff"}`}
            />
          </button>
        </div>
        <div className="rounded-md h-[100px] sm:h-[160px] pt-2">
          <img
            src={thumbnail}
            alt={`Image for ${productName}`}
            className="w-full h-full object-contain"
          />
        </div>
        <p className="mt-2 text-center text-sm line-clamp-3 h-[3em]">{productName}</p>
        <p className="mt-2 text-center text-sm line-clamp-3">{brand}</p>
        <p className="mt-2 text-center text-sm line-clamp-3 ">${price}</p>
      </Link>
    </div>
  );
};

export default SliderProductCard;
