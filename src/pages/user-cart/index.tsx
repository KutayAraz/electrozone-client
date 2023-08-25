import cartSlice from "@/setup/slices/cart-slice";

import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserCart = () => {
  const cart: any = useSelector<any>((state) => state.cart);
  const dispatch: any = useDispatch();

  const handleQuantityChange = (
    id: string,
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(
      cartSlice.actions.changeItemQuantity({
        id,
        quantity: parseInt(event.target.value),
      })
    );
  };
  return (
    <div className="max-w-screen-lg mx-auto">
      <h2>Your Shopping Cart</h2>
      {cart.items.map((product: any) => {
        return (
          <div key={product.id} className="flex w-full justify-between">
            <img src={product.thumbnail} alt="" />
            <div className="flex flex-col">
              <p>{product.name}</p>
              <p>{product.price}</p>
              <select
                value={product.quantity}
                onChange={(event) => handleQuantityChange(product.id, event)}
              >
                {Array.from({ length: 10 }, (_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <button
                onClick={() =>
                  dispatch(
                    cartSlice.actions.removeItemFromCart(product.id)
                  )
                }
              >
                Remove item from cart
              </button>
              <p>{product.totalPrice}</p>
            </div>
          </div>
        );
      })}
      <p>{cart.totalQuantity} hello</p>
      <button>Proceed to Checkout</button>
    </div>
  );
};

export default UserCart;
