import { PageHelmet } from "@/components/seo/PageHelmet";
import { ProductCard } from "@/components/ui/product-card";
import { CenteredSpinner } from "@/components/ui/spinner";
import { useAddToCart } from "@/features/cart/hooks/useAddToCart";
import { useGetUserWishlistQuery, wishlistApi } from "@/features/wishlist/api/get-wishlist";
import { useToggleWishlist } from "@/features/wishlist/hooks/useToggleWishlist";
import { loadQuery } from "@/lib/api/load-query";
import { store } from "@/stores/store";
import { Product } from "@/types/product";

// Only warms the cache - the page reads the wishlist through the query hook so that
// removing an item (which invalidates the Wishlist tag) updates the list.
export const wishlistPageLoader = async () => {
  await loadQuery(store.dispatch(wishlistApi.endpoints.getUserWishlist.initiate()));

  return null;
};

const WishlistProduct = ({ ...product }: Product) => {
  const { handleToggleWishlist, isLoading: isTogglingWishlist } = useToggleWishlist();
  const { addToCart, isLoading: isAddingToCart } = useAddToCart();

  return (
    <ProductCard
      {...product}
      onWishlistToggle={() => handleToggleWishlist(product.id)}
      onAddToCart={addToCart}
      isAddingToCart={isAddingToCart}
      isTogglingWishlist={isTogglingWishlist}
    />
  );
};

export const WishlistPage = () => {
  const { data: wishlistProducts, isLoading, isError } = useGetUserWishlistQuery();

  return (
    <>
      <PageHelmet
        title="My Wishlist | Electrozone"
        description="Keep track of your favorite products and upcoming purchases in your Electrozone wishlist."
      />

      <div className="page-spacing">
        <h4 className="text-xl font-bold pl-2">My Wishlist</h4>

        {isLoading ? (
          <CenteredSpinner className="h-40" />
        ) : isError || !wishlistProducts ? (
          <p className="pl-2 text-gray-500">Your wishlist couldn&apos;t be loaded right now.</p>
        ) : wishlistProducts.length === 0 ? (
          <h4 className="text-lg italic text-gray-500">There&apos;s nothing in your wishlist.</h4>
        ) : (
          <div className="flex flex-wrap">
            {wishlistProducts.map((product) => (
              <WishlistProduct key={product.id} {...product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
