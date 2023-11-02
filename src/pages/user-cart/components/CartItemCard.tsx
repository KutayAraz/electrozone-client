import cartSlice from "@/setup/slices/localCart-slice";
import { store } from "@/setup/store";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as Bin } from "@assets/svg/bin.svg";
import useFetch from "@/common/Hooks/use-fetch";
import { displayAlert } from "@/setup/slices/alert-slice";
import { Divider } from "@mui/material";

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
  const dispatch = useDispatch<any>();
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);
  const isSignedIn = store.getState().user.isSignedIn;
  const { fetchData } = useFetch();

  const handleQuantityChange = async (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    if (isSignedIn) {
      const newQuantity = parseInt(event.target.value);
      const result = await fetchData(
        `${import.meta.env.VITE_API_URL}/carts/user-cart`,
        "PATCH",
        { productId: id, quantity: newQuantity },
        true
      );

      if (result?.response.ok) {
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
      const result = await fetchData(
        `${import.meta.env.VITE_API_URL}/carts/user-cart`,
        "DELETE",
        { productId: id },
        true
      );

      if (result?.response.ok) {
        onRemoveItem();
      }
    } else {
      dispatch(cartSlice.actions.removeItemFromCart(id));
      onRemoveItem();
    }
    dispatch(
      displayAlert({
        type: "success",
        message: "Product has been removed from to your cart!",
        autoHide: true,
      })
    );
  };

  return (
    <div className="border rounded-md p-2 sm:p-4 flex items-start space-x-4" key={id}>
      <Link
        to={`/category/${category}/${subcategory}/${id}`}
        className="my-auto flex-shrink-0"
      >
        <div className="">
          <img
            src={thumbnail}
            alt={productName}
            className="w-32 h-32 sm:w-56 sm:h-56 lg:w-64 lg:h-64 object-contain rounded-md"
          />
        </div>
      </Link>
      <Divider orientation="vertical"  flexItem />

      <div className="flex-grow space-y-2 ">
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
