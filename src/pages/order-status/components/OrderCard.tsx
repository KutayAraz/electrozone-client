import OrderItemCard from "./OrderItemCard";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "@/utils/format-time";
import { useDispatch } from "react-redux";
import { displayAlert } from "@/stores/slices/alert-slice";
import { OrderCardProps } from "./types";
import { useFetch } from "@/hooks";

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
    <div key={orderId} className="my-4">
      <h3 className="text-2xl font-bold mb-2 ">Order Details</h3>
      <div className="border p-2 bg-white shadow-md rounded-md space-y-4 ">
        <div className="space-y-1">
          <p>
            <span className="font-bold underline">Order ID:</span> {orderId}
          </p>
          <p><span className="font-bold underline">Order Total:</span> ${orderTotal}</p>
          <p><span className="font-bold underline">Date of Order:</span> {date}</p>
        </div>

        <div className="space-y-1">
          <h2 className="text-theme-blue font-bold underline">
            User Details:
          </h2>
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p>{user.address}</p>
          <p>{user.city}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {orderItems.map((product: any) => (
            <OrderItemCard {...product} key={product.id} />
          ))}
        </div>
        <div>
          <p className="font-semibold mt-6 mb-2">
            <span className="underline text-xl font-bold">Order Total</span>: ${orderTotal}
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
    </div>
  );
};

export default OrderCard;
