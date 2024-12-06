import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

import { createUrlSlug } from "@/utils/create-url-slug";

export interface OrderItemCardProps {
  id: number;
  productName: string;
  thumbnail: string;
  quantity: number;
  price: number;
  brand: string;
  subcategory: string;
  category: string;
}

export const OrderItemCard = ({
  id,
  productName,
  thumbnail,
  quantity,
  price,
  brand,
  subcategory,
  category,
}: OrderItemCardProps) => {
  return (
    <Link
      to={`/category/${category}/${subcategory}/${createUrlSlug(productName)}-p-${id}`}
      key={id}
      className="group rounded-md border px-4 py-2 hover:border-gray-400 hover:shadow-md"
    >
      <div className="mb-4 flex items-center justify-center">
        <img src={thumbnail} alt={productName} className="h-20 w-auto" />
      </div>
      <Divider />
      <p className="mt-2 group-hover:text-theme-blue">{productName}</p>
      <p className="group-hover:text-theme-blue">{brand}</p>
      <p className="group-hover:text-theme-blue">Quantity: {quantity}</p>
      <p className="group-hover:text-theme-blue ">Total: ${price.toFixed(2)}</p>
    </Link>
  );
};

export default OrderItemCard;
