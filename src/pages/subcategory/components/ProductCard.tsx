import { ProductCardProps } from "../models";
import { useState } from "react";
import { Divider, Rating } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "@/setup/slices/localCart-slice";
import { RootState } from "@/setup/store";
import useFetch from "@/common/Hooks/use-fetch";
import { displayAlert } from "@/setup/slices/alert-slice";

const ProductCard = ({
  id,
  thumbnail,
  productName,
  brand,
  averageRating,
  price,
  subcategory,
  category,
}: ProductCardProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const { fetchData } = useFetch();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsClicked(!isClicked);
    if (isSignedIn) {
      const result = await fetchData(
        `${import.meta.env.VITE_API_URL}/carts/user-cart`,
        "POST",
        { productId: id, quantity: 1 },
        true
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

  const handleRatingClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent the Link component click event
    console.log("rating clicked");
    navigate(`/category/${category}/${subcategory}/${id}#rating`);
  };

  return (
    <Link
      to={`/category/${category}/${subcategory}/${id}`}
      className={`flex border-1 bg-white shadow-lg rounded-md sm:flex-row items-stretch text-center mb-2 w-full sm:w-1/4 md:w-1/6 ${
        isClicked ? "clicked-class" : ""
      }`}
    >
      <div className="relative w-[50%] sm:w-3/10 h-0 pb-[25vh] mb-2 sm:mb-0 sm:mr-2">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-[4px]">
          <img
            src={thumbnail}
            alt={`image for ${productName}`}
            className="max-h-full max-w-full object-cover"
          />
        </div>
      </div>
      <Divider orientation="vertical" className="self-stretch" />
      <div className="flex-1 px-2 flex flex-col justify-between my-2">
        <p>{productName}</p>
        <p className="font-[500]">{brand}</p>
        <div onClick={handleRatingClick}>
          <Rating value={averageRating} />
        </div>
        <h3 className="text-lg">$ {price.toFixed(2)}</h3>
        <button
          onClick={handleAddToCart}
          className="border-2 p-[0.3rem] max-w-[80%] mx-auto w-full  bg-theme-blue text-white rounded-lg shadow-lg text-sm xs:text-base"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
