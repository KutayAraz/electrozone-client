import { store } from "@/setup/store";
import fetchNewAccessToken from "@/utils/fetch-access-token";
import { Suspense, useState } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import WishlistProductCard, {
  WishlistProductCardProps,
} from "./components/WishlistProductCard";

const UserWishlist = () => {
  const { retrievedProducts }: any = useLoaderData();
  const [wishlistProducts, setWishlistProducts] = useState<any>(retrievedProducts);


  const handleRemove = async (id: number) => {
    let accessToken = store.getState().auth.accessToken;

    if (!accessToken) {
      await fetchNewAccessToken();
    }

    const response = await fetch(
      `http://localhost:3000/products/${id}/wishlist`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (response.status === 200) {
      setWishlistProducts((prevProducts: any) =>
        prevProducts.filter((product: any) => product.id !== id)
      );
    }
  };
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        {wishlistProducts.map((product: any) => {
          console.log(product.productName);
          return (
            <WishlistProductCard
              key={product.id}
              id={product.id}
              productName={product.productName}
              brand={product.brand}
              price={product.price}
              stock={product.stock}
              thumbnail={product.thumbnail}
              subcategory={product.subcategory}
              category={product.category}
              onRemoveFromWishlist={() => handleRemove(product.id)}
            />
          );
        })}
      </>
    </Suspense>
  );
};

export default UserWishlist;

async function loadWishlist() {
  let accessToken = store.getState().auth.accessToken;

  if (!accessToken) {
    accessToken = await fetchNewAccessToken();
  }

  const response = await fetch("http://localhost:3000/user/wishlist", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 200) {
    return await response.json();
  }
}

export async function loader() {
  return defer({
    retrievedProducts: await loadWishlist(),
  });
}
