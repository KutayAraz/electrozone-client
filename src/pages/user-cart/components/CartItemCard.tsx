import cartSlice from "@/setup/slices/localCart-slice";
import { store } from "@/setup/store";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";

const CartItemCard = ({
  id,
  productName,
  price,
  thumbnail,
  quantity,
  totalPrice,
  onRemoveItem,
  onQuantityChange
}: CartItemCardProps) => {
  const dispatch = useDispatch();
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);

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
    setSelectedQuantity(parseInt(event.target.value));
    onQuantityChange()
  };

  const handleRemoveProduct = () => {
    dispatch(cartSlice.actions.removeItemFromCart(id));
    onRemoveItem();
  };

  return (
    <div className="flex flex-col" key={id}>
      <p>{productName}</p>
      <div className="flex w-full justify-between">
        <img src={thumbnail} alt="" />
      </div>
      <p>{price}</p>
      <select
        value={selectedQuantity}
        onChange={(event) => handleQuantityChange(id, event)}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <option key={index + 1} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <button onClick={handleRemoveProduct}>Remove item from cart</button>
      <p>{totalPrice}</p>
    </div>
  );
};

export default CartItemCard;
