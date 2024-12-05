import { Divider } from "@mui/material";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

import { formatDateTime } from "@/utils/format-time";

import { OrderItemCard } from "./order-item-card";
import { OrderCardProps, Product } from "./types";

export const OrderCard = forwardRef(
  (
    { orderId, orderTotal, orderQuantity, orderDate, user, orderItems }: OrderCardProps,
    ref: any,
  ) => {
    const navigate = useNavigate();
    const date = formatDateTime(orderDate);
    return (
      <div
        key={orderId}
        className="relative my-2 rounded-lg border border-gray-300 shadow-md transition-shadow duration-300 hover:shadow-lg"
        ref={ref}
      >
        <div className="bg-gray-100 p-3">
          <p className="font-semibold">
            Order id: <span>{orderId}</span>
          </p>
          <p className="font-semibold">
            Order total: $<span>{orderTotal}</span>
          </p>
          <p className="font-semibold">
            Order quantity: <span>{orderQuantity}</span>
          </p>
          <p className="font-semibold">
            Date of order: <span>{date}</span>
          </p>
          <p>
            {user.firstName} {user.lastName}
          </p>
        </div>

        <Divider />
        <div className="noScrollbar my-2 flex space-x-2 overflow-x-auto scroll-smooth whitespace-nowrap pl-2">
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
          className="absolute right-2 top-2 rounded-md border-1 bg-theme-blue p-[4px] text-white transition-colors duration-200 hover:bg-blue-800"
        >
          Order Details
        </button>
      </div>
    );
  },
);

OrderCard.displayName = "OrderCard";
