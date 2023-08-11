import cartSlice from "@/setup/slices/cart-slice";
import { userActions } from "@/setup/slices/user-slice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const UserCart = () => {
  const cart: any = useSelector<any>((state) => state.cart);
  const dispatch: any = useDispatch()
  console.log(cart.items.length);
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
              <p>{product.id}</p>
              <button onClick={() => dispatch(cartSlice.actions.removeItemCompletelyFromCart(product.id))}>Remove item from cart</button>
            </div>
          </div>
        );
      })}
      <p>{cart.totalQuantity}</p>
    </div>
  );
};

export default UserCart;
