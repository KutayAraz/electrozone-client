import { Divider, Rating } from "@mui/material";
import { forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { useFetch } from "@/hooks/use-fetch";
import { displayAlert } from "@/stores/slices/alert-slice";
import { addItemToCart } from "@/stores/slices/local-cart-slice";
import { updateCartItemCount } from "@/stores/slices/user-slice";
import { addToWishlist, removeFromWishlist } from "@/stores/slices/wishlist-slice";
import { RootState } from "@/stores/store";
import { createUrlSlug } from "@/utils/create-url-slug";
import { truncateString } from "@/utils/truncate-string";
import { ReactComponent as HeartIcon } from "@assets/svgs/wishlist-heart.svg";

export interface ProductCardProps {
  id: number;
  thumbnail: string;
  productName: string;
  brand: string;
  averageRating: number;
  price: number;
  stock: number;
  subcategory: string;
  category: string;
  onRemoveFromWishlist?: (id: number) => void;
  className?: string;
}

export const ProductCard = forwardRef(
  (
    {
      id,
      thumbnail,
      productName,
      brand,
      averageRating,
      price,
      stock,
      subcategory,
      category,
      onRemoveFromWishlist,
      className,
    }: ProductCardProps,
    ref: any,
  ) => {
    const [isClicked, setIsClicked] = useState(false);
    const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
    const { fetchData } = useFetch();
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();

    const wishlist = useSelector((state: RootState) => state.wishlist);
    const isWishlisted = wishlist.items.includes(id);
    const handleAddToCart = async (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsClicked(!isClicked);
      if (isSignedIn) {
        const result = await fetchData(
          `${import.meta.env.VITE_API_URL}/carts/user-cart`,
          "POST",
          { productId: id, quantity: 1 },
          true,
          false,
          "addToCart",
        );
        if (result?.response.ok)
          dispatch(updateCartItemCount({ cartItemCount: result.data.totalQuantity }));
      } else {
        dispatch(addItemToCart({ id, quantity: 1 }));
      }

      dispatch(
        displayAlert({
          type: "success",
          message: `${truncateString(productName, 0, 20)} has been added to your cart!`,
          autoHide: true,
        }),
      );
    };

    // const handleRatingClick = (e: React.MouseEvent) => {
    //   e.preventDefault();
    //   e.stopPropagation(); // prevent the Link component click event
    //   console.log("rating clicked");
    //   navigate(`/category/${category}/${subcategory}/${id}#rating`);
    // };

    const toggleWishlist = async (id: number) => {
      if (!isSignedIn) {
        navigate("/sign-in");
      }
      const result = await fetchData(
        `${import.meta.env.VITE_API_URL}/products/${id}/wishlist`,
        "PATCH",
        null,
        true,
      );

      if (result?.response.ok) {
        if (result.data.action === "added") {
          dispatch(addToWishlist(id));
          dispatch(
            displayAlert({
              type: "success",
              message: `${truncateString(productName, 0, 20)} has been added to your wishlist!`,
              autoHide: true,
            }),
          );
        } else if (result.data.action === "removed") {
          dispatch(removeFromWishlist(id));
          dispatch(
            displayAlert({
              type: "info",
              message: `${truncateString(productName, 0, 20)} has been removed to your wishlist!`,
              autoHide: true,
            }),
          );
          if (onRemoveFromWishlist) onRemoveFromWishlist(id);
        }
      }
    };

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

    return (
      <div className={`w-full p-2 xs:w-1/2 md:w-1/3 lg:w-1/4 ${className}`} ref={ref}>
        <Link
          to={`/category/${
            category + "/" + subcategory + "/" + createUrlSlug(productName) + "-p-" + id
          }`}
          className="group flex rounded-lg border-1 border-gray-300 px-1 py-2 hover:shadow-md xs:flex-col xs:justify-between xs:pt-2 "
        >
          <div className="absolute right-4 z-[2] xs:relative xs:ml-auto">
            <button
              onClick={handleWishlistButtonClick}
              aria-label="Remove from wishlist"
              className="scale-100 transition-transform duration-300 hover:scale-110"
            >
              <HeartIcon
                className={`inline-block h-auto w-7  ${isClicked ? "scale-125" : ""}`}
                fill={`${isWishlisted ? "#febd69" : "#ffffff"}`}
                stroke={`${isWishlisted ? "#ffffff" : "#ffffff"}`}
              />
            </button>
          </div>
          <div className="flex-1">
            <img
              src={thumbnail}
              alt={productName}
              className="mx-auto size-56 min-w-[120px] object-contain pr-1 group-hover:scale-[1.005] xs:mb-4"
            />
          </div>
          <div>
            <Divider orientation="vertical" className="m-2 block self-stretch xs:hidden" />
            <Divider className="hidden self-stretch xs:block" />
          </div>
          <div className="flex flex-1 flex-col justify-between pb-2 pt-8 text-center xs:mt-2 xs:space-y-2 xs:pt-2 [&_p]:px-6 [&_p]:text-sm">
            <p className="xs: line-clamp-2 xs:min-h-[3em]" title={productName}>
              {productName}
            </p>
            <p className="font-[700]">{brand}</p>
            <Rating
              name="half-rating-read"
              value={averageRating}
              precision={0.1}
              readOnly
              className="mx-auto"
            />
            <p className="pr-2">$ {price}</p>
            <button
              onClick={handleAddToCart}
              disabled={stock < 1}
              className={`${
                stock > 0 ? "bg-theme-blue hover:bg-blue-800" : "bg-gray-500"
              } mx-auto w-4/5 rounded-lg py-[6px] text-sm text-white shadow transition-colors duration-200 ease-in-out xs:px-6`}
            >
              {stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </Link>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";
