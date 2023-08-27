import cartSlice from "@/setup/slices/localCart-slice";
import { ChangeEvent } from "react";
import { useDispatch } from "react-redux";

const CartItemCard = ({
  id,
  productName,
  price,
  thumbnail,
  quantity,
  totalPrice,
}: CartItemCardProps) => {
  const dispatch = useDispatch();
  const handleQuantityChange = (
    id: number,
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(
      cartSlice.actions.changeItemQuantity({
        id,
        quantity: parseInt(event.target.value),
      })
    );
  };

  return (
    <div className="flex flex-col" key={id}>
      <p>{productName}</p>
      <div className="flex w-full justify-between">
        <img src={thumbnail} alt="" />
      </div>
      <p>{price}</p>
      <select
        value={quantity}
        onChange={(event) => handleQuantityChange(id, event)}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <button
        onClick={() => dispatch(cartSlice.actions.removeItemFromCart(id))}
      >
        Remove item from cart
      </button>
      <p>{totalPrice}</p>
    </div>
  );
};

export default CartItemCard
