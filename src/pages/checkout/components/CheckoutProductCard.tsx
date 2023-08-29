const CheckoutProductCard = ({
  productName,
  thumbnail,
  brand,
  quantity,
  price,
}: CheckoutProductCardProps) => {
  return (
    <div>
      <p>{productName}</p>
      <p>{brand}</p>
      <img src={thumbnail} alt={`image for ${productName}`} />
      <p>{quantity}</p>
      <p>{price}</p>
    </div>
  );
};

export default CheckoutProductCard;
