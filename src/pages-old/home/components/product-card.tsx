import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

type ProductCardProps = {
  id: number;
  productName: string;
  thumbnail: string;
  subcategory: string;
  category: string;
};

export const ProductCard = ({
  id,
  productName,
  thumbnail,
  subcategory,
  category,
}: ProductCardProps) => {
  return (
    <div className="relative mx-[4px] xs:mx-2 sm:mx-3">
      <Link
        to={`/category/${category}/${subcategory}/${id}`}
        className="flex flex-col items-center rounded-md border-2 bg-white p-2 shadow-sm hover:underline"
        key={id}
      >
        <div className="h-[80px] rounded-md sm:h-[200px]">
          <img src={thumbnail} alt={productName} className="size-full object-contain" />
        </div>
        <Divider className="text-gray-700" />
        <p className="mt-2 line-clamp-3 h-[3em] text-center text-sm">{productName}</p>
      </Link>
    </div>
  );
};
