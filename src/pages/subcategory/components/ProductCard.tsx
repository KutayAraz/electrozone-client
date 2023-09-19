import { Link } from "react-router-dom";
import { ProductCardProps } from "../models";

const ProductCard = ({
  id,
  thumbnail,
  productName,
  brand,
  avgRating,
  price,
  subcategory,
  category,
}: ProductCardProps) => {
  return (
    <Link
      to={`/${category}/${subcategory}/${id}`}
      className="flex-1/2 w-full sm:w-1/2 md:w-1/4 lg:w-1/6"
    >
      <img src={thumbnail} alt={`image for ${productName}`} />
      <h4>{productName}</h4>
      <p>{brand}</p>
      <p>{avgRating}</p>
      <h3>{price}</h3>
      <button>Buy Now</button>
    </Link>
  );
};

export default ProductCard;
