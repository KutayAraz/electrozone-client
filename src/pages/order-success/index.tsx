import { Link, useLocation } from "react-router-dom";
import { ReactComponent as SuccessIcon } from "@assets/svg/success.svg";

const OrderSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  return (
    <div className="m-[2%]">
      <h2 className="text-2xl text-gray-700 mb-2">
        Order Successful
        <SuccessIcon className="h-8 w-auto inline-block pl-2" />
      </h2>
      <p className="my-3 text-lg">
        Your order with id: {orderId} is received. Thank you for your order.
      </p>
      <Link
        to="/"
        className="border-1 bg-theme-blue text-white p-2 rounded-lg inline-block hover:bg-blue-600"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
