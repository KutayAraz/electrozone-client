import { Divider } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { useFetch } from "@/hooks/use-fetch";
import { displayAlert } from "@/stores/slices/alert-slice";
import { localCartSlice } from "@/stores/slices/local-cart-slice";
import { updateCartItemCount } from "@/stores/slices/user-slice";
import { store } from "@/stores/store";
import { createUrlSlug } from "@/utils/create-url-slug";
import { truncateString } from "@/utils/truncate-string";
import { ReactComponent as Bin } from "@assets/svgs/bin.svg";

type CartItemCardProps = {
  id: number;
  productName: string;
  thumbnail: string;
  quantity: number;
  price: string;
  amount: number;
  category: string;
  subcategory: string;
  onRemoveItem: () => void;
  onQuantityChange: () => void;
};

export const CartItemCard = ({
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

  const handleQuantityChange = async (event: ChangeEvent<HTMLSelectElement>) => {
    if (isSignedIn) {
      const newQuantity = parseInt(event.target.value);
      const result = await fetchData(
        `${import.meta.env.VITE_API_URL}/carts/user-cart`,
        "PATCH",
        { productId: id, quantity: newQuantity },
        true,
      );

      if (result?.response.ok) {
        setSelectedQuantity(newQuantity);
        onQuantityChange();
        dispatch(updateCartItemCount({ cartItemCount: result.data.totalQuantity }));
      }
    } else {
      dispatch(
        localCartSlice.actions.changeItemQuantity({
          id,
          quantity: parseInt(event.target.value),
        }),
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
        true,
      );

      if (result?.response.ok) {
        onRemoveItem();
        dispatch(updateCartItemCount({ cartItemCount: result.data.totalQuantity }));
      }
    } else {
      dispatch(localCartSlice.actions.removeItemFromCart(id));
      onRemoveItem();
    }
    dispatch(
      displayAlert({
        type: "info",
        message: `${truncateString(productName, 0, 20)} has been removed from to your cart!`,
        autoHide: true,
      }),
    );
  };

  return (
    <div className="flex space-x-4 rounded-md border p-2" key={id}>
      <Link
        to={`/category/${
          category + "/" + subcategory + "/" + createUrlSlug(productName) + "-p-" + id
        }`}
        className="my-auto shrink-0"
      >
        <div className="">
          <img
            src={thumbnail}
            alt={productName}
            className="size-32 rounded-md object-contain md:size-36"
          />
        </div>
      </Link>
      <Divider orientation="vertical" flexItem />

      <div className="flex flex-col justify-around text-sm">
        <Link
          to={`/category/${
            category + "/" + subcategory + "/" + createUrlSlug(productName) + "-p-" + id
          }`}
        >
          <p className="transition duration-200 hover:text-blue-800">{productName}</p>
        </Link>
        <p className="text-sm">${price}</p>
        <div className="flex items-center space-x-2">
          <select
            value={selectedQuantity}
            onChange={(event) => handleQuantityChange(event)}
            className="rounded-md border p-[5px]"
          >
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <button onClick={handleRemoveProduct} className="text-red-500 hover:underline">
            <Bin className="h-auto w-6" />
          </button>
        </div>
        <p className="font-[600]">Total: ${Number(amount).toFixed(2)}</p>
      </div>
    </div>
  );
};
