import { Suspense } from "react";
import {
  Await,
  defer,
  redirect,
  useLoaderData,
  useParams,
} from "react-router-dom";
import OrderItemCard from "./components/OrderItemCard";
import { store } from "@/setup/store";
import fetchNewAccessToken from "@/utils/renew-token";
import OrderCard from "./components/OrderCard";
import loaderFetch from "@/utils/loader-fetch";
import { setRedirectPath } from "@/setup/slices/redirect-slice";

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

const getOrderDetails = async (orderId: number, request: Request) => {
  const urlObj = new URL(request.url);
  const result = await loaderFetch(
    `${import.meta.env.VITE_API_URL}/orders/user/${orderId}`,
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

export const loader = async (params: { orderId: number }, request: Request) => {
  const orderId = params.orderId;

  const orderDetails: any = await getOrderDetails(orderId, request);

  return defer({
    order: orderDetails.data,
  });
};
