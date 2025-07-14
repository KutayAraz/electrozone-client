import { OrderItem } from "@/types/order";
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
  orderItems: OrderItem[];
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
    <article className="my-4" aria-labelledby={`order-${orderId}-title`}>
      {/* Header */}
      <header className="mb-3">
        <h1 id={`order-${orderId}-title`} className="text-xl font-bold text-gray-900">
          Order Details
        </h1>
      </header>

      {/* Main Content */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* Order Information Section */}
        <section className="border-b border-gray-100 p-4" aria-labelledby={`order-${orderId}-info`}>
          <h2 id={`order-${orderId}-info`} className="mb-3 text-lg font-semibold text-gray-900">
            Order Information
          </h2>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1">
              <dt className="text-sm font-medium text-gray-500">Order ID</dt>
              <dd className="text-sm font-semibold text-gray-900">#{orderId}</dd>
            </div>

            <div className="space-y-1">
              <dt className="text-sm font-medium text-gray-500">Order Total</dt>
              <dd className="text-sm font-semibold text-gray-900">${orderTotal}</dd>
            </div>

            <div className="space-y-1">
              <dt className="text-sm font-medium text-gray-500">Order Date</dt>
              <dd className="text-sm font-semibold text-gray-900">{date}</dd>
            </div>
          </div>
        </section>

        {/* Shipping Information Section */}
        <section
          className="border-b border-gray-100 p-4"
          aria-labelledby={`order-${orderId}-shipping`}
        >
          <h2 id={`order-${orderId}-shipping`} className="mb-3 text-lg font-semibold text-blue-600">
            Shipping Information
          </h2>

          <div className="space-y-1">
            <div>
              <dt className="sr-only">Customer Name</dt>
              <dd className="text-sm font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </dd>
            </div>

            <div>
              <dt className="sr-only">Shipping Address</dt>
              <dd className="text-sm text-gray-600">{user.address}</dd>
              <dd className="text-sm text-gray-600">{user.city}</dd>
            </div>
          </div>
        </section>

        {/* Order Items Section */}
        <section className="p-4" aria-labelledby={`order-${orderId}-items`}>
          <h2 id={`order-${orderId}-items`} className="mb-3 text-lg font-semibold text-gray-900">
            Order Items ({orderItems.length})
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {orderItems.map((product: OrderItem) => (
              <OrderItemDetailsCard {...product} key={product.id} />
            ))}
          </div>
        </section>

        {/* Order Summary Section */}
        <section
          className="border-t border-gray-100 bg-gray-50 p-4"
          aria-labelledby={`order-${orderId}-summary`}
        >
          <div className="flex items-center justify-between">
            <h2 id={`order-${orderId}-summary`} className="text-lg font-bold text-gray-900">
              Order Total
            </h2>
            <span className="text-xl font-bold text-gray-900">${orderTotal}</span>
          </div>

          {/* Cancel Order Button */}
          {isCancellable && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={onOrderCancel}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-20"
                aria-describedby={`cancel-order-${orderId}-description`}
              >
                Cancel Order
              </button>
              <span id={`cancel-order-${orderId}-description`} className="sr-only">
                Cancel order #{orderId} for ${orderTotal}
              </span>
            </div>
          )}
        </section>
      </div>
    </article>
  );
};
