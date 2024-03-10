import { Suspense, useState } from "react";
import { defer, redirect, useLoaderData } from "react-router-dom";
import WishlistProductCard from "./components/WishlistProductCard";
import { useDispatch } from "react-redux";
import useFetch from "@/common/Hooks/use-fetch";
import { displayAlert } from "@/setup/slices/alert-slice";
import {
  UnauthorizedError,
  loaderFetchProtected,
} from "@/utils/loader-fetch-protected";

const UserWishlist = () => {
  const { wishlistedProducts }: any = useLoaderData();
  const [wishlistProducts, setWishlistProducts] =
    useState<any>(wishlistedProducts);
  const { fetchData } = useFetch();
  const dispatch = useDispatch<any>();

  const handleRemove = async (id: number) => {
    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/products/${id}/wishlist`,
      "PATCH",
      null,
      true
    );

    if (result?.response.ok) {
      setWishlistProducts((prevProducts: any) =>
        prevProducts.filter((product: any) => product.id !== id)
      );
      dispatch(
        displayAlert({
          type: "success",
          message: "Product has been removed to your wishlist!",
          autoHide: true,
        })
      );
    }
  };

  const handleAddToCart = async (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = await fetchData(
      `${import.meta.env.VITE_API_URL}/carts/user-cart`,
      "POST",
      { productId: id, quantity: 1 },
      true
    );
    if (result?.response.ok) {
      dispatch(
        displayAlert({
          type: "success",
          message: "Product has been added to your cart!",
          autoHide: true,
        })
      );

    }
  };

  return (
    <div className="page-spacing">
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <h4 className="font-bold text-xl">My Wishlist</h4>
          {wishlistProducts.length === 0 ? (
            <p className="text-gray-500 italic text-xl">
              There's nothing in your wishlist.
            </p>
          ) : (
            <div className="flex flex-wrap">
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
    </div>

  );
};

export default UserWishlist;

export const loader = async (request: any) => {
  try {
    const wishlistedProducts = await loaderFetchProtected(
      `${import.meta.env.VITE_API_URL}/user/wishlist`,
      "GET",
      request.request
    );
    return defer({
      wishlistedProducts,
    });
  } catch (error: unknown) {
    if (error instanceof UnauthorizedError) {
      return redirect("/sign-in");
    }
    throw error;
  }
};
