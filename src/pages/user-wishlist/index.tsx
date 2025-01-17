import { Suspense, useState } from "react";
import { defer, redirect, useLoaderData } from "react-router-dom";

import { ProductCard } from "@/components/ui/product-card/product-card";
import { loaderFetchProtected, UnauthorizedError } from "@/utils/loader-fetch-protected";

export const UserWishlist = () => {
  const { wishlistedProducts }: any = useLoaderData();
  const [wishlistProducts, setWishlistProducts] = useState<any>(wishlistedProducts);

  const handleRemove = async (id: number) => {
    setWishlistProducts((prevProducts: any) =>
      prevProducts.filter((product: any) => product.id !== id),
    );
  };

  return (
    <div className="page-spacing">
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <h4 className="pl-2 text-xl font-bold">My Wishlist</h4>
          {wishlistProducts.length === 0 ? (
            <h4 className="text-xl italic text-gray-500">There&apos;s nothing in your wishlist.</h4>
          ) : (
            <div className="flex flex-wrap">
              {wishlistProducts.map((product: any) => {
                return (
                  <ProductCard
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

export const loader = async (request: any) => {
  try {
    const wishlistedProducts = await loaderFetchProtected(
      `${import.meta.env.VITE_API_URL}/user/wishlist`,
      "GET",
      request.request,
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
