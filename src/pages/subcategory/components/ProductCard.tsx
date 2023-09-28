import { ProductCardProps } from "../models";
import { useState } from "react";
import { Divider, Rating } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "@/setup/slices/localCart-slice";
import { RootState } from "@/setup/store";

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
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const handleButtonClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsClicked(!isClicked);
    if (isSignedIn) {
      const response = await fetch("http://localhost:3000/carts/user-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ productId: id, quantity: 1 }),
      });

      if (response.status === 201) {
        window.alert("added to cart");
      }
    } else {
      dispatch(addItemToCart({ id, quantity: 1 }));
      window.alert("added to cart");
    }
  };

  const handleRatingClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent the Link component click event
    console.log("rating clicked");
    navigate(`/category/${category}/${subcategory}/${id}#rating`);
  };

  return (
    <Link
      to={`/category/${category}/${subcategory}/${id}`}
      className={`flex border-1 bg-white shadow-lg rounded-md sm:flex-row items-center text-center mb-2 w-full sm:w-1/4 md:w-1/6 ${
        isClicked ? "clicked-class" : ""
      }`}
    >
      <div className="relative w-[50%] sm:w-3/10 h-0 pb-[25vh] mb-2 sm:mb-0 sm:mr-2 ">
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-[4px]">
          <img
            src={thumbnail}
            alt={`image for ${productName}`}
            className="max-h-full max-w-full object-cover"
          />
        </div>
      </div>
      <Divider orientation="vertical" />
      <div className="flex-1 pr-[2px]">
        <h4 className="text-sm mb-1 ">{productName}</h4>
        <p className="text-sm mb-1 font-semibold">{brand}</p>
        <div onClick={handleRatingClick}>
          <Rating value={averageRating} />
        </div>
        <h3 className="text-lg mb-1">$ {price}</h3>
        <button
          onClick={handleButtonClick}
          className="border-2 py-1 p-2 bg-theme-blue text-white rounded-lg shadow-lg text-sm"
        >
          Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
