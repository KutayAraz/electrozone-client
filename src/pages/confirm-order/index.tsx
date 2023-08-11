import { useSelector } from "react-redux";

const ConfirmOrder = () => {
  const cart: any = useSelector<any>((state) => state.cart);
  return (
    <>
      <p>{cart.items[0]}</p>
    </>
  );
};

export default ConfirmOrder;
