import { Link } from "react-router-dom";
import { ProductProps } from "../models";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import cartSlice from "@/setup/slices/cart-slice";
import { useState } from "react";

const Product = ({ product }: ProductProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch();
  return (
    <div className="flex max-w-screen-xs mx-auto">
      <img src={product.thumbnail} alt="" />
      <div className="flex flex-col">
        <h2>{product.productName}</h2>
        <p>{product.brand}</p>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <div className="flex">
          <button onClick={() => setQuantity((prev) => ++prev)}>+</button>
          <p>{quantity}</p>
          <button onClick={() => setQuantity((prev) => --prev)}>-</button>
        </div>

        {product.stock > 0 ? (
          <div className="flex flex-col">
            <button
              onClick={() =>
                dispatch(
                  cartSlice.actions.addItemToCart({
                    id: product.id,
                    price: product.price,
                    quantity,
                    totalPrice: product.price * quantity,
                    name: product.productName,
                  })
                )
              }
            >
              Add to Cart
            </button>
            <button>Buy now</button>
          </div>
        ) : (
          <p>This product is currently out of stock</p>
        )}
      </div>

      <Link to={""}>
        <Rating
          name="half-rating-read"
          value={product.averageRating}
          precision={0.1}
          readOnly
        />
      </Link>

      <button>Add to Wishlist</button>
      <button>Write a review</button>
      {/* <Reviews /> */}
    </div>
  );
};

export default Product;
