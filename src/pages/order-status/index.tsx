import { Suspense } from "react";
import { Await, defer, redirect, useLoaderData } from "react-router-dom";

import { UnauthorizedError, loaderFetchProtected } from "@/utils/loader-fetch-protected";

import { OrderCard } from "./components/order-card";

export const OrderStatus = () => {
  const { order }: any = useLoaderData();
  return (
    <div className="page-spacing">
      <Suspense fallback={<p>Loading Order...</p>}>
        <Await resolve={order}>
          <OrderCard
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

export const loader = async (request: any) => {
  try {
    const orderId = request.params.orderId;
    const orderDetails: any = await loaderFetchProtected(
      `${import.meta.env.VITE_API_URL}/orders/user/${orderId}`,
      "GET",
      request.request,
      null,
    );
    return defer({
      order: orderDetails,
    });
  } catch (error: unknown) {
    if (error instanceof UnauthorizedError) {
      return redirect("/sign-in");
    }
    throw error;
  }
};
