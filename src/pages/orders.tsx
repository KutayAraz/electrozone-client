import { useCallback, useRef } from "react";

import { Spinner } from "@/components/ui/spinner";
import type { OrderSummary } from "@/features/orders/api/get-orders";
import { getOrdersApi } from "@/features/orders/api/get-orders";
import { OrderCard } from "@/features/orders/components/order-card";

export const OrdersPage = () => {
  const { data, isFetching, isLoading, fetchNextPage, hasNextPage } =
    getOrdersApi.useGetOrdersInfiniteQuery();

  //   Set up the intersection observer with useCallback to avoid unnecessary recreations
  const observer = useRef<IntersectionObserver | null>(null);

  // Create a callback ref for the last element
  const lastOrderRef = useCallback(
    (node: HTMLDivElement | null) => {
      // Skip if we're already fetching or the node is null
      if (isFetching || !node) return;

      // Disconnect previous observer if it exists
      if (observer.current) {
        observer.current.disconnect();
      }

      // Create new observer
      observer.current = new IntersectionObserver(
        (entries) => {
          // If the target is visible and we have more pages
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { threshold: 0.1 },
      );

      // Start observing the new node
      observer.current.observe(node);
    },
    [fetchNextPage, hasNextPage, isFetching],
  );

  // Flatten the pages array to get all orders
  const allResults = data?.pages?.flat() || [];

  return (
    <div className="page-spacing">
      <h2 className="mb-2 text-xl font-semibold">Previous Orders</h2>
      {isLoading ? (
        <p>
          Loading Orders... <Spinner />
        </p>
      ) : allResults.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          {allResults.map((order: OrderSummary, index: number) => {
            // Set the observer ref on the last element
            const isLastElement = index === allResults.length - 1;
            return (
              <OrderCard
                ref={isLastElement ? lastOrderRef : null}
                key={order.orderId}
                orderId={order.orderId}
                orderTotal={order.orderTotal}
                user={order.user}
                orderQuantity={order.orderQuantity}
                orderDate={order.orderDate}
                orderItems={order.orderItems}
              />
            );
          })}
          {isFetching && !isLoading && (
            <div className="flex justify-center py-4">
              <Spinner />
            </div>
          )}
        </>
      )}
    </div>
  );
};
