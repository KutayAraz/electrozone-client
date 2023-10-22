import { Rating } from "@mui/material";
import { ProductCardProps } from "./models";
import { Link } from "react-router-dom";

const ProductCard = ({
  subcategory,
  id,
  thumbnail,
  productName,
  averageRating,
  price,
  category,
}: ProductCardProps) => {
  return (
    <div className="product-card w-1/2 sm:w-1/3 md:w-1/4 px-2 text-center items-center mb-2 ">
      <Link
        to={`/category/${category}/${subcategory + "/" + id}`}
        className="border-1 border-gray-300 rounded-md shadow-md hover:bg-gray-100 h-full px-4 pt-4 pb-2 flex flex-col "
      >
        <div>
          <img
            src={thumbnail}
            alt={`image for ${productName}`}
            className="w-56 h-56 object-contain mx-auto"
          />
        </div>
        <div>
          <Rating
            name="half-rating-read"
            value={parseFloat(averageRating)}
            precision={0.1}
            readOnly
          />
          <p>{productName}</p>
          <p>$ {price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
