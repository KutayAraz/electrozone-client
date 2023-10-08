import { Link, useNavigate } from "react-router-dom";
import { ProductProps } from "./models";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "@/setup/slices/localCart-slice";
import { useState } from "react";
import fetchNewAccessToken from "@/utils/renew-token";
import { addtoBuyNowCart } from "@/setup/slices/buyNowCart-slice";
import { setUserIntent } from "@/setup/slices/user-slice";
import { CheckoutIntent } from "@/setup/slices/models";
import WishlistButton from "./WishlistButton";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { displayAlert } from "@/setup/slices/alert-slice";
import { AppDispatch, RootState } from "@/setup/store";
import { AnyAction } from "@reduxjs/toolkit";

const Product = ({
  id,
  productName,
  brand,
  thumbnail,
  images,
  description,
  averageRating,
  price,
  stock,
  category,
  subcategory,
  isWishlisted,
  updateWishlistStatus,
}: ProductProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState(thumbnail);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  let accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const incrementQuantity = () => {
    setQuantity((prev) => (prev < 10 ? ++prev : prev));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? --prev : prev));
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(value > 10 ? 10 : value);
    }
  };

  const handleAddToCart = async () => {
    if (isSignedIn) {
      const response = await fetch("http://localhost:3000/carts/user-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ productId: id, quantity }),
      });

      if (response.status === 201) {
        dispatch(
          displayAlert({
            type: "success",
            message: "Product has been added to your cart!",
            autoHide: true,
          })
        );
      }
    } else {
      dispatch(addItemToCart({ id, quantity }));
      dispatch(
        displayAlert({
          type: "success",
          message: "Product has been added to your cart!",
          autoHide: true,
        })
      );
    }
  };

  const handleBuyNow = async () => {
    dispatch(addtoBuyNowCart({ id, quantity }));
    dispatch(setUserIntent(CheckoutIntent.Instant));
    if (!isSignedIn) {
      navigate("/sign-in", { state: { from: { pathname: "/checkout" } } });
    } else if (!accessToken || isSignedIn) {
      await fetchNewAccessToken();
      navigate("/checkout");
    } else {
      navigate("/checkout");
    }
  };

  const toggleWishlist = async () => {
    if (!isSignedIn) {
      navigate("/sign-in");
    }
    if (!accessToken) {
      accessToken = await fetchNewAccessToken();
    }

    const response = await fetch(
      `http://localhost:3000/products/${id}/wishlist`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      const data = await response.json();

      if (data.action === "added") {
        updateWishlistStatus(true);
        dispatch(
          displayAlert({
            type: "success",
            message: "Product has been added to your wishlist!",
            autoHide: true,
          })
        );
      } else if (data.action === "removed") {
        updateWishlistStatus(false);
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
    <div className="mt-4 sm:px-4 max-w-screen-sm mx-[3%]">
      <div className="flex flex-col text-center">
        <div className="hidden md:flex mb-4 sm:mb-0">
          <Link to={`/${category.replace(/-/g, "_")}`} className="mr-2">
            {category}&gt;
          </Link>
          <Link
            to={`/${category.replace(/-/g, "_")}/${subcategory.replace(
              /-/g,
              "_"
            )}`}
          >
            {subcategory}
          </Link>
        </div>
        <h2 className="text sm:text-lg ">{productName}</h2>
        <p className="font-[500] sm:text-base mb-2">{brand}</p>
        <div className="hidden sm:flex flex-col-reverse w-full sm:w-[20%] mb-4 sm:mb-0">
          <img
            src={thumbnail}
            alt=""
            className="object-contain w-full mb-2 cursor-pointer"
            onClick={() => setSelectedImage(thumbnail)}
          />
          {images?.map((image: any, index: number) => (
            <img
              key={index}
              src={image.productImage}
              alt=""
              className="object-contain w-full mb-2 cursor-pointer"
              onClick={() => setSelectedImage(image.productImage)}
            />
          ))}
        </div>
        <Slider
          dots={true}
          dotsClass="slick-dots"
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          className="lg:hidden"
          arrows={false}
        >
          <img
            src={thumbnail}
            alt={`thumbnail image for ${productName}`}
            className="hidden xs:block object-contain w-full sm:w-[50%] mb-4 sm:mb-0"
          />
          {images?.map((image: any) => (
            <div key={image.id}>
              <img
                src={image.productImage}
                alt={`image for ${productName}`}
                className="w-64 h-64 object-contain mx-auto"
                onClick={() => setSelectedImage(image.productImage)}
              />
            </div>
          ))}
        </Slider>

        <div className="flex flex-col text-left sm:text-center w-full sm:w-auto">
          <p className="text-lg sm:text-xl mb-2 text-center mt-10">${price}</p>
          <div className="flex justify-center mb-4">
            <button
              onClick={decrementQuantity}
              className="px-2 py-1 border rounded"
            >
              -
            </button>
            <input
              type="text"
              value={quantity}
              onChange={handleQuantityChange}
              min={1}
              max={10}
              className="text-center w-16 mx-2 border rounded"
            />
            <button
              onClick={incrementQuantity}
              className="px-2 py-1 border rounded"
            >
              +
            </button>
          </div>
          {stock > 0 ? (
            <div className="flex flex-col mb-4 w-[80%] mx-auto">
              <button
                onClick={handleAddToCart}
                className=" sm:w-auto px-4 py-2 bg-theme-blue text-white rounded-xl mb-2"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full sm:w-auto px-4 py-2 bg-theme-orange text-white rounded-xl"
              >
                Buy now
              </button>
            </div>
          ) : (
            <p className="text-red-500">
              This product is currently out of stock
            </p>
          )}
          <div className="flex flex-col justify-center items-center mb-4">
            <Link to={"#rating"} className="mr-4">
              <Rating
                name="half-rating-read"
                value={parseFloat(averageRating)}
                precision={0.1}
                readOnly
              />
            </Link>
            <WishlistButton
              isWishlisted={isWishlisted}
              toggleWishlist={toggleWishlist}
            />
          </div>
        </div>
      </div>
      <h3 className="underline mb-2 ">Product Description</h3>
      <ul className="">
        {description.map((bulletPoint: string, index: number) => (
          <li className="text-sm  mb-2" key={index}>
            - {bulletPoint}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;
