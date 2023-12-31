import { Suspense } from "react";
import { Await, defer, redirect, useLoaderData } from "react-router-dom";
import OrderCard from "./components/OrderCard";
import {
  UnauthorizedError,
  loaderFetchProtected,
} from "@/utils/loader-fetch-protected";
import { OrderCardProps } from "./components/types";

const MyOrders = () => {
  const { orders }: any = useLoaderData();

  return (
    <div className="max-w-screen-lg mx-auto">
      <h2 className="text-xl font-[500] text-color-500 my-2 mx-[1%] md:mx-auto">Previous Orders</h2>
      <Suspense fallback={<p>Loading..</p>}>
        <Await
          resolve={orders}
          children={(resolvedOrders) => {
            return resolvedOrders.map((order: OrderCardProps) => (
              <OrderCard
                key={order.orderId}
                orderId={order.orderId}
                orderTotal={order.orderTotal}
                user={order.user}
                orderQuantity={order.orderQuantity}
                orderDate={order.orderDate}
                orderItems={order.orderItems}
              />
            ));
          }}
        />
      </Suspense>
    </div>
  );
};

export default MyOrders;

export const loader = async ({ request }: any) => {
  try {
    const result = await loaderFetchProtected(
      `${import.meta.env.VITE_API_URL}/orders/user`,
      "GET",
      request,
      null
    );
    return defer({ orders: result });
  } catch (error: unknown) {
    if (error instanceof UnauthorizedError) {
      return redirect("/sign-in");
    }
  }
};
