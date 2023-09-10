const OrderItemCard = ({ id, quantity, price, product }: any) => {
  return (
    <div key={id}>
      <p>quantity: {quantity}</p>
      <p>{product.productName}</p>
      <img src={product.thumbnail} alt={`image for ${product.productName}`} />
      <p>price: {price}</p>
      <p>quantity: {quantity}</p>
    </div>
  );
};

export default OrderItemCard;
