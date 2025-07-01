import { useLoaderData } from "react-router-dom";

import { ProductCard } from "@/components/ui/product-card";
import { useAddToCart } from "@/features/cart/hooks/use-add-to-cart";
import { wishlistApi } from "@/features/wishlist/api/get-wishlist";
import { useToggleWishlist } from "@/features/wishlist/hooks/use-toggle-wishlist";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { removeFromWishlist } from "@/stores/slices/wishlist-slice";
import { store } from "@/stores/store";

export const wishlistPageLoader = async () => {
  return await store.dispatch(wishlistApi.endpoints.getUserWishlist.initiate());
};

const WishlistProduct = ({ product }: any) => {
  const dispatch = useAppDispatch();

  const { handleToggleWishlist, isLoading: isTogglingWishlist } = useToggleWishlist();
  const { addToCart, isLoading: isAddingToCart } = useAddToCart();

  const handleRemove = async (productId: number) => {
    handleToggleWishlist(productId);
    dispatch(removeFromWishlist(productId));
  };

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
      onWishlistToggle={() => handleRemove(product.id)}
      onAddToCart={addToCart}
      isAddingToCart={isAddingToCart}
      isTogglingWishlist={isTogglingWishlist}
    />
  );
};

export const WishlistPage = () => {
  const wishlistProducts = useLoaderData();

  return (
    <div className="page-spacing">
      <h4 className="text-xl font-bold pl-2">My Wishlist</h4>
      {wishlistProducts?.length === 0 ? (
        <h4 className="text-lg italic text-gray-500">There&apos;s nothing in your wishlist.</h4>
      ) : (
        <div className="flex flex-wrap">
          {wishlistProducts?.data.map((product: any) => {
            return <WishlistProduct product={product} key={product.id} />;
          })}
        </div>
      )}
    </div>
  );
};
