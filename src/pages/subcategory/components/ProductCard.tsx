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
    <div className="w-full xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-2 text-center items-center mb-2">
      <Link
        to={`${subcategory + "/" + id}`}
        className="border-1 border-gray-300 rounded-md shadow-md hover:bg-gray-100 h-full px-2 xs:px-4 py-2 xs:pt-4 pb-2 flex xs:flex-col xs:justify-between"
      >
        <div className="flex-1 px-2 xs:px-0">
          <img
            src={thumbnail}
            alt={`image for ${productName}`}
            className="w-56 h-56 xs:h-auto object-contain mx-auto"
          />
        </div>
        <Divider
          orientation="vertical"
          className="self-stretch xs:hidden mx-2"
        />
        <Divider className="self-stretch hidden xs:block" />
        <div className="xs:mt-2 flex-1 flex flex-col px-2 xs:px-0 my-auto space-y-2 justify-between">
          <p>{productName}</p>
          <p className="font-[500]">{brand}</p>
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
            className="border-2 p-[0.3rem] max-w-[80%] mx-auto w-full  bg-theme-blue text-white rounded-lg shadow-lg text-sm xs:text-base hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
