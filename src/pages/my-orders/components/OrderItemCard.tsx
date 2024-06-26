import { Link } from "react-router-dom";
import { OrderItemCardProps } from "./types";
import { createUrlSlug } from "@/utils/create-url-slug";

const OrderItemCard = ({
  id,
  productName,
  thumbnail,
  subcategory,
  category,
}: OrderItemCardProps) => {
  return (
    <Link
      to={`/category/${category}/${subcategory}/${createUrlSlug(productName)}-p-${id}`}
      key={id}
      className="flex-shrink-0 scroll-snap-align-start mr-2 sm:mr-4 border border-transparent hover:border-1 hover:border-white rounded p-4">
      <img
        src={thumbnail}
        alt={`image for ${productName}`}
        className="h-20 w-auto object-contain"
      />
    </Link>
  );
};

export default OrderItemCard;
