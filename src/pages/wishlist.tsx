import { ProductCard } from "@/components/ui/product-card";
import { Spinner } from "@/components/ui/spinner";
import { useAddToCart } from "@/features/cart/hooks/use-add-to-cart";
import { useGetUserWishlistQuery, wishlistApi } from "@/features/wishlist/api/get-wishlist";
import { useToggleWishlist } from "@/features/wishlist/hooks/use-toggle-wishlist";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { removeFromWishlist } from "@/stores/slices/wishlist-slice";
import { store } from "@/stores/store";

export const wishlistLoader = () => {
  return store.dispatch(wishlistApi.endpoints.getUserWishlist.initiate());
};

export const WishlistPage = () => {
  const { data: wishlistProducts, isLoading: isWishlistProductsLoading } =
    useGetUserWishlistQuery();
  const dispatch = useAppDispatch();

  const { handleToggleWishlist, isLoading: isWishlistToggling } = useToggleWishlist();
  const { addToCart, isLoading: isAddingToCart } = useAddToCart();

  const handleRemove = async (productId: number) => {
    handleToggleWishlist(productId);
    dispatch(removeFromWishlist(productId));
  };

  return (
    <div className="page-spacing">
      <h4 className="text-xl font-bold">My Wishlist</h4>
      {isWishlistProductsLoading ? (
        <Spinner />
      ) : wishlistProducts?.length === 0 ? (
        <h4 className="text-lg italic text-gray-500">There&apos;s nothing in your wishlist.</h4>
      ) : (
        <div className="flex flex-wrap">
          {wishlistProducts?.map((product: any) => {
            return (
              <ProductCard
                key={product.id}
                productId={product.id}
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
                isTogglingWishlist={isWishlistToggling}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
