import cartSlice from "@/setup/slices/localCart-slice";
import { store } from "@/setup/store";
import fetchNewAccessToken from "@/utils/fetch-access-token";
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
  onQuantityChange,
}: CartItemCardProps) => {
  const dispatch = useDispatch();
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);
  const isSignedIn = store.getState().user.isSignedIn;
  
  const handleQuantityChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    if (isSignedIn) {
      let accessToken = store.getState().auth.accessToken;

      const newQuantity = parseInt(event.target.value)

      if (!accessToken) {
        accessToken = await fetchNewAccessToken();
      }
      const data = await fetch("http://localhost:3000/carts/user-cart", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ productId: id, quantity: newQuantity }),
      });

      if (data.status === 200) {
        setSelectedQuantity(newQuantity);
        onQuantityChange();
      }
    } else {
      dispatch(
        cartSlice.actions.changeItemQuantity({
          id,
          quantity: parseInt(event.target.value),
        })
      );
      setSelectedQuantity(parseInt(event.target.value));
      onQuantityChange();
    }
  };

  const handleRemoveProduct = async () => {
    if (isSignedIn) {
      let accessToken = store.getState().auth.accessToken;

      if (!accessToken) {
        accessToken = await fetchNewAccessToken();
      }

      const data = await fetch("http://localhost:3000/carts/user-cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ productId: id }),
      });

      if (data.status === 200) {
        onRemoveItem();
      }
    } else {
      dispatch(cartSlice.actions.removeItemFromCart(id));
      onRemoveItem();
    }
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
        onChange={(event) => handleQuantityChange(event)}
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
