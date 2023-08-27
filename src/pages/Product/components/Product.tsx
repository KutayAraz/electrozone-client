import { Link } from "react-router-dom";
import { ProductProps } from "../models";
import Rating from "@mui/material/Rating";
import { useDispatch, useSelector } from "react-redux";
import cartSlice, { addItemToCart } from "@/setup/slices/localCart-slice";
import { useState } from "react";
import Reviews from ".";
import fetchNewAccessToken from "@/utils/fetch-access-token";

const Product = ({
  id,
  productName,
  brand,
  thumbnail,
  description,
  averageRating,
  price,
  stock,
}: ProductProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state: any) => state.user.isSignedIn);
  const accessToken = useSelector((state: any) => state.auth.accessToken);

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

      if (response.status === 401) {
        await fetchNewAccessToken(dispatch);
        const response = await fetch("http://localhost:3000/carts/user-cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ productId: id, quantity }),
        });

        console.log(response.status);
      }
    } else {
      dispatch(addItemToCart({ id, quantity }));
    }
  };

  return (
    <div className="flex max-w-screen-md mx-auto text-center w-full justify-between">
      <img src={thumbnail} alt="" className="object-contain w-[50%]" />
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
            <button
              onClick={() => {
                dispatch(
                  cartSlice.actions.addItemToCart({
                    id,
                    quantity,
                  })
                );
                handleAddToCart();
              }}
            >
              Add to Cart
            </button>
            <button>Buy now</button>
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

        <button>Add to Wishlist</button>
      </div>
    </div>
  );
};

export default Product;
