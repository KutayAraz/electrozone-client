import { Suspense } from "react";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";
import OrderItemCard from "./components/OrderItemCard";
import { store } from "@/setup/store";
import fetchNewAccessToken from "@/utils/renew-token";
import OrderCard from "./components/OrderCard";

const OrderStatus = () => {
  const { order }: any = useLoaderData();
  return (
    <Suspense fallback={<p>Loading Order...</p>}>
      <Await
        resolve={order}
        children={(resolvedOrder) => (
          <OrderCard
            orderId={resolvedOrder.orderId}
            orderTotal={resolvedOrder.orderTotal}
            orderDate={resolvedOrder.orderDate}
            user={resolvedOrder.user}
            orderItems={resolvedOrder.orderItems}
            isCancellable={resolvedOrder.isCancellable}
          />
        )}
      />
    </Suspense>
  );
};

export default OrderStatus;

const getOrderDetails = async (orderId: number) => {
  let accessToken = store.getState().auth.accessToken;

  if (!accessToken) {
    accessToken = await fetchNewAccessToken();
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/orders/user/${orderId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.ok) {
    return await response.json();
  }
};

export const loader = ({ params }: any) => {
  const orderId = params.orderId;
  return defer({
    order: getOrderDetails(orderId),
  });
};
