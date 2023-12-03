import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { OrderItemCardProps } from "./types";

const OrderItemCard = ({
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
      to={`/category/${category}/${subcategory}/${id}`}
      key={id}
      className="group border px-4 py-2 rounded-md hover:shadow-md hover:border-gray-400"
    >
      <div className="flex items-center justify-center mb-4">
        <img
          src={thumbnail}
          alt={`image for ${productName}`}
          className="h-20 w-auto"
        />
      </div>
      <Divider />
      <p className="text-gray-700 group-hover:text-theme-blue mt-2">
        {productName}
      </p>
      <p className="text-gray-700 group-hover:text-theme-blue">{brand}</p>
      <p className="text-gray-700 group-hover:text-theme-blue">Quantity: {quantity}</p>
      <p className="text-gray-700 group-hover:text-theme-blue ">
        Total: ${price.toFixed(2)}
      </p>
    </Link>
  );
};

export default OrderItemCard;
