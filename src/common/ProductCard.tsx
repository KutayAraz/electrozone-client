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
  const truncatedProductName = productName.length > 55 ? `${productName.substring(0, 55)}...` : productName;
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
        message: "Product has been added to your cart!",
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
    <div className={`w-full xs:w-1/2 md:w-1/3 lg:w-1/4 p-2 text-center items-center ${className}`} ref={ref}>
  <Link
    to={`/category/${category + "/" + subcategory + "/" + id}`}
    className="border-1 border-gray-300 rounded-lg hover:shadow-md hover:bg-gray-100 px-2 py-2 xs:pt-4 pb-2 flex xs:flex-col xs:justify-between group"
  >
    <div className="ml-auto text-right pr-1">
      <button
        onClick={handleWishlistButtonClick}
        aria-label="Remove from wishlist"
        className="transition-transform duration-300 transform scale-100 group-hover:scale-110"
      >
        <HeartIcon
          className={`w-7 h-auto inline-block hover:scale-125 ${isClicked ? "transform scale-125" : ""}`}
          fill={`${isWishlisted ? "#febd69" : "#ffffff"}`}
        />
      </button>
    </div>
    <div className="flex-1 px-2 xs:px-0">
      <img
        src={thumbnail}
        alt={`image for ${productName}`}
        className="min-w-[120px] w-56 h-56 xs:w-auto xs:h-[256px] object-contain mx-auto group-hover:scale-[1.005]"
      />
    </div>
    <div className="xs:mt-2 flex-1 flex flex-col px-2 xs:px-0 my-auto space-y-[4px] justify-between">
      <Divider
        orientation="vertical"
        className="self-stretch xs:hidden m-2"
      />
      <Divider className="self-stretch hidden xs:block" />
      <p className="text-sm line-clamp-3 min-h-[3em]" title={productName}>{truncatedProductName}</p>
      <p className="text-sm">{brand}</p>
      <Rating
        name="half-rating-read"
        value={averageRating}
        precision={0.1}
        readOnly
        className="mx-auto"
      />
      <p>$ {price.toFixed(2)}</p>
      <button
        onClick={handleAddToCart}
        className="bg-theme-blue hover:bg-blue-800 text-white text-sm py-[6px] px-5 xs:px-6 rounded-lg shadow transition-colors duration-200 ease-in-out"
      >
        Add to Cart
      </button>
    </div>
  </Link>
</div>

  );
});

export default ProductCard;
