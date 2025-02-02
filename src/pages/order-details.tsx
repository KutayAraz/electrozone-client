import { Suspense } from "react";
import { Await, defer, LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";

import { orderApi } from "@/features/orders/api/order-api";
import { store } from "@/stores/store";

import { OrderDetailsCard } from "../features/orders/components/order-details/order-card";

export const OrderDetails = () => {
  const { order }: any = useLoaderData();
  return (
    <div className="page-spacing">
      <Suspense fallback={<p>Loading Order...</p>}>
        <Await resolve={order}>
          <OrderDetailsCard
            orderId={order.id}
            orderTotal={order.orderTotal}
            orderDate={order.orderDate}
            user={order.user}
            orderItems={order.orderItems}
            isCancellable={order.isCancellable}
          />
        </Await>
      </Suspense>
    </div>
  );
};

export const loader = async (request: LoaderFunctionArgs) => {
  try {
    const orderId = Number(request.params.orderId);

    // Initialize query
    const response = await store.dispatch(orderApi.endpoints.getOrder.initiate(orderId));

    if ("error" in response) {
      // Handle RTK Query error
      if (response.error && "status" in response.error && response.error.status === 401) {
        return redirect("/sign-in");
      }
      throw response.error;
    }

    return defer({
      order: response.data,
    });
  } catch (error: unknown) {
    console.error("Error loading order:", error);
    throw error;
  }
};
