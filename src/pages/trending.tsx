import { useState } from "react";
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router-dom";

import { PageHelmet } from "@/components/seo/PageHelmet";
import { useAddToCart } from "@/features/cart/hooks/useAddToCart";
import { ProductList } from "@/features/product-listing/components/ProductListing";
import { getTopProductsApi, ProductTrend } from "@/features/products/api/get-top-products";
import { useToggleWishlist } from "@/features/wishlist/hooks/useToggleWishlist";
import { loadQuery } from "@/lib/api/load-query";
import { store } from "@/stores/store";
import { formatString } from "@/utils/format-casing";

export const trendingProductsLoader = (request: LoaderFunctionArgs) => {
  const trend = request.params.type as ProductTrend;
  return loadQuery(store.dispatch(getTopProductsApi.endpoints.getTopProducts.initiate(trend)));
};

export const TrendingProductsPage = () => {
  const products = useLoaderData<typeof trendingProductsLoader>();

  const { type = "" } = useParams<{ type: string }>();

  // Cart and wishlist functionality
  const [togglingWishlistId, setTogglingWishlistId] = useState<number | null>(null);
  const [addingToCartId, setAddingToCartId] = useState<number | null>(null);

  const { handleToggleWishlist } = useToggleWishlist();
  const { addToCart } = useAddToCart();

  // Cart and wishlist handlers
  const handleWishlistToggle = async (productId: number) => {
    setTogglingWishlistId(productId);

    try {
      await handleToggleWishlist(productId);
    } finally {
      setTogglingWishlistId(null);
    }
  };

  const handleAddToCart = async (productId: number) => {
    setAddingToCartId(productId);

    try {
      await addToCart(productId);
    } finally {
      setAddingToCartId(null);
    }
  };

  const isProductTogglingWishlist = (productId: number) => togglingWishlistId === productId;
  const isProductAddingToCart = (productId: number) => addingToCartId === productId;

  return (
    <>
      <PageHelmet
        title={`${formatString(type, "-")} | Electrozone`}
        description="Browse trending electronics and gadgets at Electrozone, updated daily to showcase the latest in tech."
      />

      <div className="page-spacing">
        <h4 className="my-3 ml-2 text-xl font-bold">{formatString(type, "-")} Site-Wide</h4>

        <div className="flex flex-wrap">
          <ProductList
            products={products}
            onAddToCart={handleAddToCart}
            onWishlistToggle={handleWishlistToggle}
            isAddingToCart={isProductAddingToCart}
            isTogglingWishlist={isProductTogglingWishlist}
          />
        </div>
      </div>
    </>
  );
};
