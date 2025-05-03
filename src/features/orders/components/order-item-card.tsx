import { Link } from "react-router-dom";

import { createUrlSlug } from "@/utils/create-url-slug";

interface OrderItemCardProps {
  id: number;
  productName: string;
  thumbnail: string;
  subcategory: string;
  category: string;
}

export const OrderItemCard = ({
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
      className="mr-2 shrink-0 rounded border border-transparent p-4 hover:border-1 hover:border-white sm:mr-4"
    >
      <img src={thumbnail} alt={productName} className="h-20 w-auto object-contain" />
    </Link>
  );
};
