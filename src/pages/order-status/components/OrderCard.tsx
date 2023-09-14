import { RootState } from "@/setup/store";
import OrderItemCard from "./OrderItemCard";
import fetchNewAccessToken from "@/utils/fetch-access-token";
import { useNavigate } from "react-router-dom";

const OrderCard = ({
  orderId,
  orderTotal,
  orderDate,
  user,
  orderItems,
  isCancellable,
}: any) => {
  const accessToken = (state: RootState) => state.auth.accessToken;
  const navigate = useNavigate();
  const handleCancelButton = async () => {
    if (!accessToken) {
      await fetchNewAccessToken();
    }

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/orders/${orderId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(orderId),
      }
    );

    if (response.ok) {
      navigate("/my-orders");
    }
  };

  return (
    <div key={orderId}>
      <p>order id: {orderId}</p>
      <p>order total: {orderTotal}</p>
      <p>date of order: {orderDate}</p>
      <h2>User Details</h2>
      <p>{user.firstName}</p>
      <p>{user.lastName}</p>
      <p>{user.address}</p>
      <p>{user.city}</p>
      {orderItems.map((product: any) => (
        <OrderItemCard
          key={product.id}
          id={product.id}
          thumbnail={product.thumbnail}
          brand={product.brand}
          quantity={product.quantity}
          price={product.price}
          category={product.category}
          subcategory={product.subcategory}
        />
      ))}
      {isCancellable && (
        <button onClick={handleCancelButton}>Cancel this order</button>
      )}
    </div>
  );
};

export default OrderCard;
