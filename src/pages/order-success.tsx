import { Link, useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as SuccessIcon } from "@assets/svgs/success.svg";

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderId = location.state?.orderId;

  if (!orderId) {
    navigate("/");
  }

  return (
    <div className="page-spacing">
      <h2 className="mb-2 text-2xl text-gray-700">
        Order Successful
        <SuccessIcon className="inline-block h-8 w-auto pl-2" />
      </h2>
      <p className="my-3 text-lg">
        Your order with id: {orderId} is received. Thank you for your order.
      </p>
      <Link
        to="/"
        className="inline-block rounded-lg border-1 bg-theme-blue p-2 text-white hover:bg-blue-600"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderSuccess;
