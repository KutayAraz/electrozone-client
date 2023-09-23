import { Link } from "react-router-dom";

const UserAccount = () => {
  return (
    <>
      <h2 className="text-2xl font-semibold">Your Account Information</h2>
      <div className="flex flex-col m-4">
        <Link to="profile">Manage your address</Link>
        <Link to="orders">Previous Orders</Link>
        <Link to="update-password">Manage Password</Link>
        <Link to="wishlist">Wishlist</Link>
        <Link to="sign-out">Sign Out</Link>
      </div>
    </>
  );
};

export default UserAccount;
