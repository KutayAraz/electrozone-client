import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({
  id,
  productName,
  thumbnail,
  subcategory,
  category,
}: ProductCard) => {
  return (
    <div>
      <Link
        to={`/category/${category}/${subcategory}/${id}`}
        className="flex flex-col bg-white items-center p-2 hover:underline border-2 rounded-md shadow-sm"
        key={id}
      >
        <div className="rounded-md">
          <img
            src={thumbnail}
            alt={`Image for ${productName}`}
            className="w-16 h-16 object-contain object-center"
          />
        </div>
        <Divider className="text-gray-700"/>
        <p className="mt-2 text-center text-sm line-clamp-3 h-[3em]">{productName}</p>
      </Link>
    </div>
  );
};

export default ProductCard;
