import { RootState, store } from "@/setup/store";
import fetchNewAccessToken from "@/utils/fetch-access-token";
import { Suspense, useState } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import WishlistProductCard, {
  WishlistProductCardProps,
} from "./components/WishlistProductCard";
import { useSelector } from "react-redux";

const UserWishlist = () => {
  const { retrievedProducts }: any = useLoaderData();
  const [wishlistProducts, setWishlistProducts] =
    useState<any>(retrievedProducts);
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);

  const handleRemove = async (id: number) => {
    if (!accessToken) {
      await fetchNewAccessToken();
    }

    const response = await fetch(
      `${import.meta.env.API_URL}/products/${id}/wishlist`,
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

  const handleAddToCart = async (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const response = await fetch("http://localhost:3000/carts/user-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ productId: id, quantity: 1 }),
    });

    if (response.status === 201) {
      window.alert("added to cart");
    }
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        {wishlistProducts.length === 0 ? (
          <p className="text-gray-500 italic m-4">
            There's nothing in your wishlist.
          </p>
        ) : (
          <div>
            {wishlistProducts.map((product: any) => {
              return (
                <WishlistProductCard
                  key={product.id}
                  id={product.id}
                  productName={product.productName}
                  brand={product.brand}
                  price={product.price}
                  averageRating={product.averageRating}
                  stock={product.stock}
                  thumbnail={product.thumbnail}
                  subcategory={product.subcategory}
                  category={product.category}
                  onAddToCart={handleAddToCart}
                  onRemoveFromWishlist={() => handleRemove(product.id)}
                />
              );
            })}
          </div>
        )}
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

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/user/wishlist`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 200) {
    return await response.json();
  }
}

export async function loader() {
  return defer({
    retrievedProducts: await loadWishlist(),
  });
}
