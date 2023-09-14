import { Link } from "react-router-dom";

const OrderItemCard = ({
  id,
  productName,
  thumbnail,
  quantity,
  price,
  brand,
  subcategory,
  category,
}: any) => {
  return (
    <Link to={`/${category}/${subcategory}/${id}`} key={id}>
      <p>{productName}</p>
      <p>{brand}</p>
      <img src={thumbnail} alt={`image for ${productName}`} />
      <p>{quantity}</p>
      <p>{price}</p>
    </Link>
  );
};

export default OrderItemCard;
