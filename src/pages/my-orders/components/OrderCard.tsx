import OrderItemCard from "./OrderItemCard";

const OrderCard = ({ orderId, orderTotal, orderDate, orderItems }: any) => {
  return (
    <div key={orderId}>
      <p>order id: {orderId}</p>
      <p>order total: {orderTotal}</p>
      <p>date of order: {orderDate}</p>
      {orderItems.map((order: any) => (
        <OrderItemCard
          key={order.id}
          quantity={order.quantity}
          price={order.price}
          product={order.product}
        />
      ))}
    </div>
  );
};

export default OrderCard;
