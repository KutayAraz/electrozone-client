import { Divider } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

import { createUrlSlug } from "@/utils/create-url-slug";
import Bin from "@assets/svgs/bin.svg?react";

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
  onQuantityChange: (event: ChangeEvent<HTMLSelectElement>) => void;
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
  const [selectedQuantity, setSelectedQuantity] = useState(quantity);

  const handleQuantityChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedQuantity(parseInt(event.target.value));
    onQuantityChange(event);
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
            onChange={handleQuantityChange}
            className="rounded-md border p-[5px]"
          >
            {Array.from({ length: 10 }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <button onClick={onRemoveItem} className="text-red-500 hover:underline">
            <Bin className="h-auto w-6" />
          </button>
        </div>
        <p className="font-[600]">Total: ${Number(amount).toFixed(2)}</p>
      </div>
    </div>
  );
};
