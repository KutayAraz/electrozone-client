import { Suspense } from "react";
import {
  Await,
  Location,
  defer,
  redirect,
  useLoaderData,
} from "react-router-dom";
import OrderCard from "./components/OrderCard";
import loaderFetch from "@/utils/loader-fetch";
import { store } from "@/setup/store";
import { setRedirectPath } from "@/setup/slices/redirect-slice";

const MyOrders = () => {
  const { orders }: any = useLoaderData();

  return (
    <Suspense fallback={<p>Loading..</p>}>
      <Await
        resolve={orders}
        children={(resolvedOrders) => {
          return resolvedOrders.map((order: any) => (
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
  );
};

export default MyOrders;

export const ordersLoader = async (request: Request) => {
  const urlObj = new URL(request.url);
  const result = await loaderFetch(
    `${import.meta.env.VITE_API_URL}/orders/user`,
    "GET",
    null,
    true
  );

  if (result.error && "status" in result.error && result.error.status === 401) {
    store.dispatch(setRedirectPath(urlObj.pathname));
    return redirect("/sign-in");
  }
  return result;
};

export const loader = async ({ request }: any) => {
  const orders: any = await ordersLoader(request);
  return defer({ orders: orders.data });
};
