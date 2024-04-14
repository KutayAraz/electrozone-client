import { formatDateTime } from "@/utils/format-time";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import OrderItemCard from "./OrderItemCard";
import { OrderCardProps, Product } from "./types";

const OrderCard = ({
  orderId,
  orderTotal,
  orderQuantity,
  orderDate,
  user,
  orderItems,
}: OrderCardProps) => {
  const navigate = useNavigate();
  const date = formatDateTime(orderDate);
  return (
    <div
      key={orderId}
      className="relative border-2 my-2 rounded-lg"
    >
      <div className="bg-gray-100 p-3">
        <p className="font-semibold">Order id: <span>{orderId}</span></p>
        <p className="font-semibold">Order total: $<span>{orderTotal}</span></p>
        <p className="font-semibold">Order quantity: <span>{orderQuantity}</span></p>
        <p className="font-semibold">Date of order: <span>{date}</span></p>
        <p>
          {user.firstName} {user.lastName}
        </p>
      </div>

      <Divider />
      <div className="flex my-2 pl-2 space-x-2 overflow-x-auto whitespace-nowrap scroll-snap-type-x-mandatory noScrollbar scroll-smooth">
        {orderItems.map((product: Product) => (
          <OrderItemCard
            key={product.productId}
            id={product.productId}
            productName={product.productName}
            thumbnail={product.thumbnail}
            subcategory={product.subcategory}
            category={product.category}
          />
        ))}
      </div>
      <button
        onClick={() => navigate(`${orderId}`)}
        className="absolute top-2 right-2 border-1 text-white bg-theme-blue hover:bg-blue-800 rounded-md p-[4px]"
      >
        Order Details
      </button>
    </div>
  );
};

export default OrderCard;
