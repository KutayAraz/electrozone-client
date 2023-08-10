import { Link } from "react-router-dom";
import { Product } from "./models.ts";

const ProductCard = ({
  subcategoryName,
  id,
  thumbnail,
  productName,
}: Product) => {
  return (
    <Link to={`${subcategoryName + "/" + id}`} className="flex flex-col">
      <img
        src={thumbnail}
        alt={`image for ${productName}`}
        className="max-w-{20%]"
      />
      <p>{productName}</p>
    </Link>
  );
};

export default ProductCard;
