import { defer } from "react-router-dom";

const UserWishlist = () => {
  return <></>;
};

export default UserWishlist;

async function loadWishlist() {}

export async function loader() {
  return defer({
    wishlistProducts: await loadWishlist(),
  });
}
