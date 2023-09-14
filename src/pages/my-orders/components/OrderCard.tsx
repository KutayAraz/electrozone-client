import { formatDateTime } from "@/utils/format-time";
import OrderItemCard from "../../order-status/components/OrderItemCard";
import { useNavigate } from "react-router-dom";

const OrderCard = ({
  orderId,
  orderTotal,
  orderQuantity,
  orderDate,
  user,
  orderItems,
}: any) => {
  const navigate = useNavigate();
  const date = formatDateTime(orderDate);
  return (
    <div
      key={orderId}
      className="border-2 max-w-screen-lg mx-auto text-center my-2"
    >
      <p>order id: {orderId}</p>
      <p>order total: {orderTotal}</p>
      <p>order quantity: {orderQuantity}</p>
      <p>date of order: {date}</p>
      <p>
        {user.firstName} {user.lastName}
      </p>
      {orderItems.map((product: any) => (
        <OrderItemCard
          key={product.productId}
          id={product.productId}
          productName={product.productName}
          thumbnail={product.thumbnail}
          subcategory={product.subcategory}
          category={product.category}
        />
      ))}
      <button onClick={() => navigate(`${orderId}`)}>Order Details</button>
    </div>
  );
};

export default OrderCard;
