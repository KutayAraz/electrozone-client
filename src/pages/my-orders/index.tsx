import { store } from "@/setup/store";
import fetchNewAccessToken from "@/utils/renew-token";
import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import OrderCard from "./components/OrderCard";

const MyOrders = () => {
  const { orders }: any = useLoaderData();

  return (
    <Suspense fallback={<p>Loading..</p>}>
      <Await
        resolve={orders}
        children={(resolvedOrders) =>
          resolvedOrders.map((order: any) => (
            <OrderCard
              orderId={order.orderId}
              orderTotal={order.orderTotal}
              user={order.user}
              orderQuantity={order.orderQuantity}
              orderDate={order.orderDate}
              orderItems={order.orderItems}
            />
          ))
        }
      />
    </Suspense>
  );
};

export default MyOrders;

const loadUserOrders = async () => {
  let accessToken = store.getState().auth.accessToken;

  if (!accessToken) {
    accessToken = await fetchNewAccessToken();
  }

  const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.ok) {
    return await response.json();
  }
};

export const loader = async () => {
  return defer({
    orders: loadUserOrders(),
  });
};
