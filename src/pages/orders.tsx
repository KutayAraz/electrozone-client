import { PageHelmet } from "@/components/seo/PageHelmet";
import { CenteredSpinner, Spinner } from "@/components/ui/spinner";
import type { OrderSummary } from "@/features/orders/api/get-orders";
import { getOrdersApi } from "@/features/orders/api/get-orders";
import { OrderCard } from "@/features/orders/components/OrderCard";
import { useInfiniteScrollRef } from "@/hooks/useInfiniteScrollRef";

export const OrdersPage = () => {
  const { data, isFetching, isLoading, fetchNextPage, hasNextPage } =
    getOrdersApi.useGetOrdersInfiniteQuery();

  // Callback ref for the last order - loads the next page when it scrolls into view
  const lastOrderRef = useInfiniteScrollRef({ fetchNextPage, hasNextPage, isFetching });

  // Flatten the pages array to get all orders
  const allResults = data?.pages?.flat() || [];

  return (
    <>
      <PageHelmet
        title="Orders | Electrozone"
        description="View and manage your Electrozone orders, track shipping, and handle returns."
      />

      <div className="page-spacing">
        <h2 className="mb-2 text-xl font-bold">Previous Orders</h2>

        {isLoading ? (
          <p>
            Loading Orders... <Spinner size={20} />
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
                  {...order}
                />
              );
            })}

            {isFetching && !isLoading && <CenteredSpinner className="py-4" />}
          </>
        )}
      </div>
    </>
  );
};
