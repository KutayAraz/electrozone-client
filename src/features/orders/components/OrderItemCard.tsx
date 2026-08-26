import { Link } from "react-router-dom";

import { paths } from "@/config/paths";
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
      to={paths.products.category.subcategory.product.getHref({
        category,
        subcategory,
        productSlug: `${createUrlSlug(productName)}-p-${id}`,
      })}
      key={id}
      className="inline-block mr-2 sm:mr-4 p-2 border border-gray-300 hover:border-gray-400 rounded-2xl transition-colors duration-200"
    >
      <img src={thumbnail} alt={productName} className="h-24 w-24 object-contain" loading="lazy" />
    </Link>
  );
};
