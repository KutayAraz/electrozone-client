import { ArrowForward, CheckCircle, LocalShipping, ShoppingBag } from "@mui/icons-material";
import { Link, LoaderFunctionArgs, redirect, useLoaderData } from "react-router-dom";

import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { paths } from "@/config/paths";
import { getOrderByIdApi } from "@/features/orders/api/get-order-by-id";
import { CheckoutLayout } from "@/layouts/checkout-layout";
import { store } from "@/stores/store";

export const orderConfirmationLoader = async ({ params }: LoaderFunctionArgs) => {
  const { orderId } = params;

  if (!orderId) {
    return redirect("/");
  }

  try {
    // Validate the order belongs to the current user
    const result = await store
      .dispatch(getOrderByIdApi.endpoints.getOrderById.initiate(Number(orderId)))
      .unwrap();

    if (!result) {
      // Order doesn't belong to this user or doesn't exist
      store.dispatch(
        displayNotification({
          type: NotificationType.ERROR,
          message: "The order does not exist or you are not authorized to view this order.",
        }),
      );
      return redirect("/");
    }

    return { orderId, orderData: result };
  } catch (error) {
    store.dispatch(
      displayNotification({
        type: NotificationType.ERROR,
        message: "The order does not exist or you are not authorized to view this order.",
      }),
    );
    return redirect("/");
  }
};

export const OrderConfirmationPage = () => {
  const { orderId, orderData } = useLoaderData();

  return (
    <CheckoutLayout hideBackButton={true} isSuccessPage={true}>
      <div className="mx-auto max-w-4xl py-8">
        <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-md">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-800">Order Successful!</h1>
            <p className="mb-4 text-lg text-gray-600">
              Thank you for your trying out checkout process. Your order has been received.
            </p>
            <div className="mb-2 rounded-lg bg-blue-50 px-4 py-2 text-lg font-medium text-blue-800">
              Order ID: #{orderId}
            </div>
            <p className="text-sm text-gray-600">Total: ${orderData.orderTotal}</p>
          </div>

          <div className="mb-8 space-y-4 rounded-lg bg-gray-50 p-6">
            <div className="flex items-center">
              <LocalShipping className="mr-3 text-blue-600" />
              <span>You can track your order status in your account dashboard.</span>
            </div>
            <div className="flex items-center">
              <ShoppingBag className="mr-3 text-blue-600" />
              <span>You can cancel your order until it is a day old.</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <Link
              to={paths.app.orders.order.getHref(orderId)}
              className="flex items-center justify-center rounded-md border border-blue-600 bg-white px-6 py-3 text-center font-medium text-blue-600 shadow-sm transition-all duration-200 hover:bg-blue-50"
            >
              View Order Details
            </Link>
            <Link
              to={paths.home.getHref()}
              className="flex items-center justify-center rounded-md bg-theme-orange px-6 py-3 text-center font-medium text-white shadow-md transition-all duration-200 hover:bg-orange-500 active:transform active:scale-[0.98]"
            >
              Continue Shopping
              <ArrowForward className="ml-2" fontSize="small" />
            </Link>
          </div>
        </div>
      </div>
    </CheckoutLayout>
  );
};
