import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router-dom";

import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import {
  displayNotification,
  NotificationType,
} from "@/components/ui/notifications/notification-slice";
import { Spinner } from "@/components/ui/spinner";
import { paths } from "@/config/paths";
import { useCancelOrderMutation } from "@/features/orders/api/cancel-order";
import { getOrderByIdApi } from "@/features/orders/api/get-order-by-id";
import { OrderDetailsCard } from "@/features/orders/components/order-details-card";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { useConfirmationDialog } from "@/hooks/use-confirmation-dialog";
import { store } from "@/stores/store";

export const orderDetailsLoader = async (request: LoaderFunctionArgs) => {
  const orderId = Number(request.params.orderId);

  return store.dispatch(getOrderByIdApi.endpoints.getOrderById.initiate(orderId));
};

export const OrderDetails = () => {
  const order = useLoaderData();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [cancelOrder, { isLoading }] = useCancelOrderMutation();

  const submitCancellation = async () => {
    await cancelOrder(order.data.id).unwrap();

    dispatch(
      displayNotification({
        type: NotificationType.SUCCESS,
        message: "Your order has been cancelled successfully",
      }),
    );

    navigate(paths.app.profile.orders.getHref());
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
    <div className="page-spacing">
      {order.state === "loading" ? (
        <Spinner />
      ) : (
        <>
          <OrderDetailsCard
            orderId={order.data.id}
            orderTotal={order.data.orderTotal}
            orderDate={order.data.orderDate}
            user={order.data.user}
            orderItems={order.data.orderItems}
            isCancellable={order.data.isCancellable}
            onOrderCancel={handleCancelClick}
          />

          <ConfirmationDialog
            {...dialogProps}
            onConfirm={handleConfirmCancel}
            isProcessing={isLoading}
          />
        </>
      )}
    </div>
  );
};
