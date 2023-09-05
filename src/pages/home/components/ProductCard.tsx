import { Link } from "react-router-dom";

const ProductCard = ({
  id,
  productName,
  thumbnail,
  subcategory,
  category,
}: ProductCard) => {
  return (
    <Link
      to={`/${category}/${subcategory}/${id}`}
      className="flex flex-col max-w-screen-sm"
      key={id}
    >
      <img src={thumbnail} alt={`Image for ${productName}`} className=""/>
      <p>{productName}</p>
    </Link>
  );
};

export default ProductCard;
