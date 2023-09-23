import { Link } from "react-router-dom";
import { ProductCardProps } from "../models";
import { useState } from "react";
import { Divider, Rating } from "@mui/material";

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
  console.log("the id is", id)

  return (
    <div
      className={`flex border-1 bg-white shadow-lg rounded-md sm:flex-row items-center text-center mb-4 w-full sm:w-1/4 md:w-1/6 ${
        isClicked ? "clicked-class" : ""
      }`}
    >
      <Link
        to={`/category/${category}/${subcategory}/${id}`}
        className="relative w-[50%] sm:w-3/10 h-0 pb-[25vh] mb-2 sm:mb-0 sm:mr-2 "
      >
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden px-[4px]">
          <img
            src={thumbnail}
            alt={`image for ${productName}`}
            className="max-h-full max-w-full object-cover"
          />
        </div>
      </Link>
      <Divider orientation="vertical" />
      <div className="flex-1 pr-[2px]">
        <h4 className="text-sm mb-1 ">{productName}</h4>
        <p className="text-sm mb-1 font-semibold">{brand}</p>
        <Rating value={averageRating} />
        <h3 className="text-lg mb-1">$ {price}</h3>
        <button
          onClick={() => setIsClicked(!isClicked)}
          className="border-2 py-1 px-3 bg-theme-blue text-white rounded-lg shadow-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
