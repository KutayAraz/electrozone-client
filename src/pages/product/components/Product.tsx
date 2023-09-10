import { Link, useNavigate } from "react-router-dom";
import { ProductProps } from "../models";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "@/setup/slices/localCart-slice";
import { useState } from "react";
import fetchNewAccessToken from "@/utils/fetch-access-token";
import { addtoBuyNowCart } from "@/setup/slices/buyNowCart-slice";
import { setUserIntent } from "@/setup/slices/user-slice";
import { CheckoutIntent } from "@/setup/slices/models";
import WishlistButton from "./WishlistButton";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSignedIn = useSelector((state: any) => state.user.isSignedIn);
  let accessToken = useSelector((state: any) => state.auth.accessToken);

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
        window.alert("added to cart");
      }
    } else {
      dispatch(addItemToCart({ id, quantity }));
      window.alert("added to cart");
    }
  };

  const handleBuyNow = async () => {
    dispatch(addtoBuyNowCart({ id, quantity }));
    dispatch(setUserIntent(CheckoutIntent.Instant));
    if (!isSignedIn) {
      navigate("/sign-in", { state: { from: { pathname: "/checkout" } } });
    } else if (!accessToken || isSignedIn()) {
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
      const data = await response.json(); // Parse the JSON from the response

      if (data.action === "added") {
        updateWishlistStatus(true);
      } else if (data.action === "removed") {
        updateWishlistStatus(false);
      }
    }
  };

  return (
    <div className="flex max-w-screen-md mx-auto text-center w-full justify-between">
      <div className="flex">
        <Link to={`/${category.replace(/-/g, "_")}`}>{category}&gt;</Link>
        <Link
          to={`/${category.replace(/-/g, "_")}/${subcategory.replace(
            /-/g,
            "_"
          )}`}
        >
          {subcategory}&gt;
        </Link>
        <Link
          to={`/${category.replace(/-/g, "_")}/${subcategory.replace(
            /-/g,
            "_"
          )}/${id}`}
        >
          {productName.slice(0, 15)}
        </Link>
      </div>
      <div className="flex flex-col-reverse w-[20%]">
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
      <img src={selectedImage} alt="" className="object-contain w-[50%]" />
      <div className="flex flex-col">
        <h2>{productName}</h2>
        <p>{brand}</p>
        <p>{description}</p>
        <p>{price}</p>
        <div className="flex">
          <button onClick={decrementQuantity}>-</button>
          <input
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            max={10}
            className="text-center"
          />
          <button onClick={incrementQuantity}>+</button>
        </div>

        {stock > 0 ? (
          <div className="flex flex-col">
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button onClick={handleBuyNow}>Buy now</button>
          </div>
        ) : (
          <p>This product is currently out of stock</p>
        )}
        <Link to={""}>
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
  );
};

export default Product;
