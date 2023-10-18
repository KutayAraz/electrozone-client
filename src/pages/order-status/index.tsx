import { Suspense } from "react";
import { Await, defer, redirect, useLoaderData } from "react-router-dom";
import OrderCard from "./components/OrderCard";
import {
  UnauthorizedError,
  loaderFetchProtected,
} from "@/utils/loader-fetch-protected";

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

export const loader = async (request: any) => {
  try {
    const orderId = request.params.orderId;
    const orderDetails: any = await loaderFetchProtected(
      `${import.meta.env.VITE_API_URL}/orders/user/${orderId}`,
      "GET",
      request.request,
      null
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
