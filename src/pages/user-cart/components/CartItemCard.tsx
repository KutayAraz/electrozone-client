import cartSlice from "@/setup/slices/localCart-slice";
import { store } from "@/setup/store";
import fetchNewAccessToken from "@/utils/renew-token";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as Bin } from "@assets/svg/bin.svg";

const CartItemCard = ({
  id,
  productName,
  price,
  thumbnail,
  quantity,
  amount,
  subcategory,
  category,
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

      const newQuantity = parseInt(event.target.value);

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
    <div className="border rounded-md p-4 flex items-start space-x-4" key={id}>
      <Link to={`/category/${category}/${subcategory}/${id}`} className="flex-shrink-0">
        <img
          src={thumbnail}
          alt={productName}
          className="w-24 h-24 object-contain rounded-md"
        />
      </Link>

      <div className="flex-grow space-y-2">
        <Link to={`/category/${category}/${subcategory}/${id}`}>
          <p className="text-gray-700 hover:text-blue-500 transition duration-200">
            {productName}
          </p>
        </Link>
        <p className="text-gray-700">${price}</p>
        <div className="flex items-center space-x-2">
          <select
            value={selectedQuantity}
            onChange={(event) => handleQuantityChange(event)}
            className="border rounded-md p-2"
          >
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <button
            onClick={handleRemoveProduct}
            className="text-red-500 hover:underline"
          >
            <Bin className="w-6 h-auto" />
          </button>
        </div>
        <p className="text-lg text-gray-700">Total: ${amount}</p>
      </div>
    </div>
  );
};

export default CartItemCard;
