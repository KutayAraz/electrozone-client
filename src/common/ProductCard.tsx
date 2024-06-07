import { forwardRef, useState } from "react";
import { Divider, Rating } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "@/setup/slices/localCart-slice";
import { RootState } from "@/setup/store";
import useFetch from "@/common/Hooks/use-fetch";
import { displayAlert } from "@/setup/slices/alert-slice";
import { updateCartItemCount } from "@/setup/slices/user-slice";
import { addToWishlist, removeFromWishlist } from "@/setup/slices/wishlist-slice";
import { ReactComponent as HeartIcon } from "@assets/svg/wishlist-heart.svg";
import { truncateString } from "@/utils/truncate-string";
import { createUrlSlug } from "@/utils/create-url-slug";

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

const ProductCard = forwardRef(({
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
}: ProductCardProps, ref: any) => {
  const [isClicked, setIsClicked] = useState(false);
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const { fetchData } = useFetch();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate()

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
        "addToCart"
      );
      if (result?.response.ok)
        dispatch(
          updateCartItemCount({ cartItemCount: result.data.totalQuantity })
        );
    } else {
      dispatch(addItemToCart({ id, quantity: 1 }));
    }

    dispatch(
      displayAlert({
        type: "success",
        message: `${truncateString(productName, 0, 20)} has been added to your cart!`,
        autoHide: true,
      })
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
            message: `${truncateString(productName, 0, 20)} has been added to your wishlist!`,
            autoHide: true,
          })
        );
      } else if (result.data.action === "removed") {
        dispatch(removeFromWishlist(id))
        dispatch(
          displayAlert({
            type: "info",
            message: `${truncateString(productName, 0, 20)} has been removed to your wishlist!`,
            autoHide: true,
          })
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
    <div className={`w-full xs:w-1/2 md:w-1/3 lg:w-1/4 p-2 ${className}`} ref={ref}>
      <Link
        to={`/category/${category + "/" + subcategory + "/" + id + "-" + createUrlSlug(productName)}`}
        className="border-1 border-gray-300 rounded-lg hover:shadow-md px-1 flex xs:flex-col xs:justify-between group py-2 xs:pt-2 "
      >
        <div className="absolute right-4 z-[2] xs:relative xs:ml-auto">
          <button
            onClick={handleWishlistButtonClick}
            aria-label="Remove from wishlist"
            className="transition-transform duration-300 transform scale-100 hover:scale-110"
          >
            <HeartIcon
              className={`w-7 h-auto inline-block  ${isClicked ? "transform scale-125" : ""}`}
              fill={`${isWishlisted ? "#febd69" : "#ffffff"}`}
              stroke={`${isWishlisted ? "#ffffff" : "#ffffff"}`}
            />
          </button>
        </div>
        <div className="flex-1">
          <img
            src={thumbnail}
            alt={`image for ${productName}`}
            className="min-w-[120px] w-56 h-56 object-contain mx-auto group-hover:scale-[1.005] pr-1 xs:mb-4"
          />
        </div>
        <div>
          <Divider
            orientation="vertical"
            className="flex-item self-stretch block xs:hidden m-2"
          />
          <Divider className="self-stretch hidden xs:block" />
        </div>
        <div className="xs:mt-2 flex-1 flex flex-col justify-between pt-8 pb-2 xs:pt-2 xs:space-y-2 text-center [&_p]:text-sm [&_p]:px-6">
          <p className="line-clamp-2 xs:min-h-[3em] xs:" title={productName}>{productName}</p>
          <p className="font-[700]">{brand}</p>
          <Rating
            name="half-rating-read"
            value={averageRating}
            precision={0.1}
            readOnly
            className="mx-auto"
          />
          <p className="pr-2">$ {price.toFixed(2)}</p>
          <button
            onClick={handleAddToCart}
            className="bg-theme-blue hover:bg-blue-800 text-white text-sm py-[6px] xs:px-6 rounded-lg shadow transition-colors duration-200 ease-in-out w-[80%] mx-auto"
          >
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
});

export default ProductCard;
