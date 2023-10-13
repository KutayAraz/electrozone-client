import { RootState } from "@/setup/store";
import OrderItemCard from "./OrderItemCard";
import fetchNewAccessToken from "@/utils/renew-token";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "@/utils/format-time";
import useFetch from "@/common/Hooks/use-fetch";
import { useDispatch } from "react-redux";
import { displayAlert } from "@/setup/slices/alert-slice";
import { OrderCardProps } from "./types";

const OrderCard = ({
  orderId,
  orderTotal,
  orderDate,
  user,
  orderItems,
  isCancellable,
}: OrderCardProps) => {
  const date = formatDateTime(orderDate);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { fetchData } = useFetch();

  const handleCancelButton = async () => {
    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
      "POST",
      orderId,
      true
    );

    if (result?.response.ok) {
      dispatch(
        displayAlert({
          type: "success",
          message: "Your order has been successfully cancelled!",
          autoHide: true,
        })
      );
      navigate("/my-orders");
    }
  };

  return (
    <div
      key={orderId}
      className="border p-2 bg-white shadow-md rounded-md space-y-4 max-w-xl my-8 mx-[1%]"
    >
      <div className="space-y-1">
        <p className="text-gray-700 font-semibold">Order ID: {orderId}</p>
        <p className="text-gray-700">Order Total: ${orderTotal}</p>
        <p className="text-gray-700">Date of Order: {date}</p>
      </div>

      <div className="space-y-1">
        <h2 className="text-blue-500 font-bold">User Details</h2>
        <p className="text-gray-700">
          {user.firstName} {user.lastName}
        </p>
        <p className="text-gray-700">{user.address}</p>
        <p className="text-gray-700">{user.city}</p>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
        {orderItems.map((product: any) => (
          <OrderItemCard {...product} key={product.id} />
        ))}
      </div>
      <div>
        <p className="font-semibold">
          <span className="underline">Order Total</span>: ${orderTotal}
        </p>
      </div>

      {isCancellable && (
        <button
          onClick={handleCancelButton}
          className="mt-4 bg-red-500 hover:bg-red-800 text-white px-4 py-2 rounded-md transition duration-200"
        >
          Cancel this order
        </button>
      )}
    </div>
  );
};

export default OrderCard;
