import { Divider } from "@mui/material";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";

import { formatDateTime } from "@/utils/format-time";

import { OrderItemSummary } from "../api/get-orders";

import { OrderItemCard } from "./order-item-card";

type OrderCardProps = {
  orderId: number;
  orderTotal: string;
  orderQuantity: number;
  orderDate: string;
  user: {
    firstName: string;
    lastName: string;
  };
  orderItems: OrderItemSummary[];
};

export const OrderCard = forwardRef(
  (
    { orderId, orderTotal, orderQuantity, orderDate, user, orderItems }: OrderCardProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const navigate = useNavigate();
    const date = formatDateTime(orderDate);

    return (
      <div
        key={orderId}
        className="relative overflow-hidden rounded-xl my-4 bg-white border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:border-gray-300"
        ref={ref}
        role="article"
        aria-label={`Order ${orderId}`}
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-2">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-900">Order #{orderId}</h3>
              <p className="text-sm text-gray-600">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <button
              onClick={() => navigate(`${orderId}`)}
              className="self-start xs:self-auto px-4 py-2 bg-theme-blue text-white text-sm font-medium rounded-lg transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`View details for order ${orderId}`}
            >
              View Details
            </button>
          </div>
        </div>

        <Divider />

        {/* Order Info Section */}
        <div className="px-6 py-3">
          <div className="grid grid-cols-2 xs:grid-cols-3 gap-x-4 gap-y-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Total Amount</p>
              <p className="text-lg xs:text-xl font-semibold text-gray-900">${orderTotal}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Items</p>
              <p className="text-lg xs:text-xl font-semibold text-gray-900">{orderQuantity}</p>
            </div>
            <div className="col-span-2 xs:col-span-1">
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Order Date</p>
              <p className="text-sm xs:text-base font-medium text-gray-900">{date}</p>
            </div>
          </div>
        </div>

        <Divider />

        {/* Products Section */}
        <div className="px-6 py-4">
          <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">Order Items</p>
          <div className="relative">
            <div
              className="flex overflow-x-auto gap-2 pb-2"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#d1d5db #f3f4f6",
              }}
              aria-label="Order items"
            >
              {orderItems.map((product: OrderItemSummary) => (
                <OrderItemCard
                  key={`${product.productId}-${orderId}`}
                  id={product.productId}
                  productName={product.productName}
                  thumbnail={product.thumbnail}
                  subcategory={product.subcategory}
                  category={product.category}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

OrderCard.displayName = "OrderCard";
