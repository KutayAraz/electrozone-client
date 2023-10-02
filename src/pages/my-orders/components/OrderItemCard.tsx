import { Link } from "react-router-dom";

const OrderItemCard = ({
  id,
  productName,
  thumbnail,
  subcategory,
  category,
}: any) => {
  return (
    <Link to={`/category/${category}/${subcategory}/${id}`} key={id}>
      <img src={thumbnail} alt={`image for ${productName}`} className="w-24 h-auto"/>
    </Link>
  );
};

export default OrderItemCard;