import cartSlice from "@/setup/slices/localCart-slice";
import { store } from "@/setup/store";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as Bin } from "@assets/svg/bin.svg";
import useFetch from "@/common/Hooks/use-fetch";
import { displayAlert } from "@/setup/slices/alert-slice";
import { Divider } from "@mui/material";
import { updateCartItemCount } from "@/setup/slices/user-slice";
import { truncateString } from "@/utils/truncate-string";
import { createUrlSlug } from "@/utils/create-url-slug";

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
        dispatch(
          updateCartItemCount({ cartItemCount: result.data.totalQuantity })
        );
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
        dispatch(
          updateCartItemCount({ cartItemCount: result.data.totalQuantity })
        );
      }
    } else {
      dispatch(cartSlice.actions.removeItemFromCart(id));
      onRemoveItem();
    }
    dispatch(
      displayAlert({
        type: "info",
        message: `${truncateString(productName, 0, 20)} has been removed from to your cart!`,
        autoHide: true,
      })
    );
  };

  return (
    <div
      className="border rounded-md p-2 flex space-x-4"
      key={id}
    >
      <Link
        to={`/category/${category + "/" + subcategory + "/" + createUrlSlug(productName) + "-p-" + id}`}
        className="my-auto flex-shrink-0"
      >
        <div className="">
          <img
            src={thumbnail}
            alt={productName}
            className="w-32 h-32 md:w-36 md:h-36 object-contain rounded-md"
          />
        </div>
      </Link>
      <Divider orientation="vertical" flexItem />

      <div className="text-sm flex flex-col justify-around">
        <Link to={`/category/${category + "/" + subcategory + "/" + createUrlSlug(productName) + "-p-" + id}`}>
          <p className="hover:text-blue-800 transition duration-200">
            {productName}
          </p>
        </Link>
        <p className="text-sm">${price}</p>
        <div className="flex items-center space-x-2">
          <select
            value={selectedQuantity}
            onChange={(event) => handleQuantityChange(event)}
            className="border rounded-md p-[5px]"
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
        <p className="font-[600]">Total: ${Number(amount).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartItemCard;
