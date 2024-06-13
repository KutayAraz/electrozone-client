import { Divider } from "@mui/material";
import { Link } from "react-router-dom";
import { OrderItemCardProps } from "./types";
import { createUrlSlug } from "@/utils/create-url-slug";

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
      to={`/category/${category}/${subcategory}/${createUrlSlug(productName)}-p-${id}`}
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
      <p className="group-hover:text-theme-blue mt-2">
        {productName}
      </p>
      <p className="group-hover:text-theme-blue">{brand}</p>
      <p className="group-hover:text-theme-blue">Quantity: {quantity}</p>
      <p className="group-hover:text-theme-blue ">
        Total: ${price.toFixed(2)}
      </p>
    </Link>
  );
};

export default OrderItemCard;
