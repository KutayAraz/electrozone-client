import { Link } from "react-router-dom";
import { CategoryProductProps } from "./models.ts";

const ProductCard = ({
  subcategoryName,
  id,
  thumbnail,
  productName,
  price,
}: CategoryProductProps) => {
  return (
    <Link to={`${subcategoryName + "/" + id}`} className="flex flex-col">
      <img
        src={thumbnail}
        alt={`image for ${productName}`}
        className="w-56 h-auto object-contain"
      />
      <p>{productName}</p>
      <p>$ {price.toFixed(2)}</p>
    </Link>
  );
};

export default ProductCard;
