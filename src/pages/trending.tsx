import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";

import { PageHelmet } from "@/components/seo/page-helmet";
import { ProductCard } from "@/components/ui/product-card";
import { Spinner } from "@/components/ui/spinner";
import { useAddToCart } from "@/features/cart/hooks/use-add-to-cart";
import { getTopProductsApi, ProductTrend } from "@/features/products/api/get-top-products";
import { useToggleWishlist } from "@/features/wishlist/hooks/use-toggle-wishlist";
import { store } from "@/stores/store";
import { formatString } from "@/utils/format-casing";

export const trendingProductsLoader = (request: LoaderFunctionArgs) => {
  const trend = request.params.type as ProductTrend;
  return store.dispatch(getTopProductsApi.endpoints.getTopProducts.initiate(trend));
};

export const TrendingProductsPage = () => {
  const products = useLoaderData();
  const { type }: any = useParams();

  const { handleToggleWishlist, isLoading: isTogglingWishlist } = useToggleWishlist();
  const { addToCart, isLoading: isAddingToCart } = useAddToCart();

  return (
    <>
      <PageHelmet
        title={`${formatString(type, "-")} | Electrozone`}
        description="Browse trending electronics and gadgets at Electrozone, updated daily to showcase the latest in tech."
      />
      <div className="page-spacing">
        <h4 className="my-3 ml-2 text-xl font-bold">{formatString(type, "-") || ""} Site-Wide</h4>
        {products.state === "loading" ? (
          <p>
            Loading Products..
            <Spinner />
          </p>
        ) : (
          <div className="flex flex-wrap">
            {products.data.map((product: any) => (
              <ProductCard
                key={product.id}
                subcategory={product.subcategory}
                category={product.category}
                productId={product.id}
                thumbnail={product.thumbnail}
                productName={product.productName}
                brand={product.brand}
                averageRating={product.averageRating}
                price={product.price}
                stock={product.stock}
                onWishlistToggle={handleToggleWishlist}
                onAddToCart={addToCart}
                isTogglingWishlist={isTogglingWishlist}
                isAddingToCart={isAddingToCart}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
