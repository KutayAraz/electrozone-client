import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";

import { PageHelmet } from "@/components/seo/PageHelmet";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { paths } from "@/config/paths";
import { useCancelOrderMutation } from "@/features/orders/api/cancel-order";
import { getOrderByIdApi } from "@/features/orders/api/get-order-by-id";
import { OrderDetailsCard } from "@/features/orders/components/OrderDetailsCard";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useConfirmationDialog } from "@/hooks/useConfirmationDialog";
import { loadQuery } from "@/lib/api/load-query";
import { store } from "@/stores/store";

export const orderDetailsLoader = async (request: LoaderFunctionArgs) => {
  const orderId = Number(request.params.orderId);

  return loadQuery(store.dispatch(getOrderByIdApi.endpoints.getOrderById.initiate(orderId)));
};

export const OrderDetails = () => {
  const order = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [cancelOrder, { isLoading }] = useCancelOrderMutation();

  const submitCancellation = async () => {
    try {
      await cancelOrder(order.id).unwrap();
    } catch {
      return;
    }

    dispatch(
      displayNotification({
        type: NotificationType.SUCCESS,
        message: "Your order has been cancelled successfully",
      }),
    );

    navigate(paths.app.orders.getHref());
  };

  const {
    handleOpen: handleCancelClick,
    handleConfirm: handleConfirmCancel,
    dialogProps,
  } = useConfirmationDialog({
    onConfirm: submitCancellation,
    confirmationTitle: "Cancel Order",
    confirmationMessage:
      "Are you sure you want to cancel this order? This action cannot be undone.",
    confirmButtonText: "Yes, Cancel Order",
    cancelButtonText: "No, Keep Order",
  });

  return (
    <>
      <PageHelmet
        title="Order Details | Electrozone"
        description="Check the status and details of your specific order at Electrozone."
      />

      <div className="page-spacing">
        <OrderDetailsCard
          orderId={order.id}
          orderTotal={order.orderTotal}
          orderDate={order.orderDate}
          user={order.user}
          orderItems={order.orderItems}
          isCancellable={order.isCancellable}
          onOrderCancel={handleCancelClick}
        />

        <ConfirmationDialog
          {...dialogProps}
          onConfirm={handleConfirmCancel}
          isProcessing={isLoading}
        />
      </div>
    </>
  );
};
