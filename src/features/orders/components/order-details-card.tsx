import { OrderItemCardProps } from "@/pages-old/my-orders/components/types";
import { formatDateTime } from "@/utils/format-time";

import { OrderItemDetailsCard } from "./order-item-details-card";

interface OrderDetailsCardProps {
  orderId: number;
  orderTotal: number;
  orderDate: string;
  user: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
  };
  orderItems: OrderItemCardProps[];
  isCancellable: boolean;
  onOrderCancel: () => void;
}

export const OrderDetailsCard = ({
  orderId,
  orderTotal,
  orderDate,
  user,
  orderItems,
  isCancellable,
  onOrderCancel,
}: OrderDetailsCardProps) => {
  const date = formatDateTime(orderDate);

  return (
    <div key={orderId} className="my-4">
      <h3 className="mb-2 text-2xl font-bold ">Order Details</h3>
      <div className="space-y-4 rounded-md border bg-white p-2 shadow-md ">
        <div className="space-y-1">
          <p>
            <span className="font-bold underline">Order ID:</span> {orderId}
          </p>
          <p>
            <span className="font-bold underline">Order Total:</span> ${orderTotal}
          </p>
          <p>
            <span className="font-bold underline">Date of Order:</span> {date}
          </p>
        </div>

        <div className="space-y-1">
          <h2 className="font-bold text-theme-blue underline">User Details:</h2>
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p>{user.address}</p>
          <p>{user.city}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {orderItems.map((product: any) => (
            <OrderItemDetailsCard {...product} key={product.id} />
          ))}
        </div>
        <div>
          <p className="mb-2 mt-6 font-semibold">
            <span className="text-xl font-bold underline">Order Total</span>: ${orderTotal}
          </p>
        </div>

        {isCancellable && (
          <button
            onClick={onOrderCancel}
            className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white transition duration-200 hover:bg-red-800"
          >
            Cancel this order
          </button>
        )}
      </div>
    </div>
  );
};
