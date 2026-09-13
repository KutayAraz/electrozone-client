import { useState } from "react";
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router";

import { PageHelmet } from "@/components/seo/PageHelmet";
import { paths } from "@/config/paths";
import { useCreateBuyNowCartMutation } from "@/features/cart/api/buy-now-cart/create-buy-now-cart";
import { useAddToCart } from "@/features/cart/hooks/useAddToCart";
import { SuggestedProducts } from "@/features/product-listing/components/SuggestedProducts";
import { getProductDetailsApi } from "@/features/products/api/get-product-details";
import { ProductDesktopLayout } from "@/features/products/components/ProductDesktopLayout";
import { ProductMobileLayout } from "@/features/products/components/ProductMobileLayout";
import { ProductTabs } from "@/features/products/components/ProductPageTabs";
import { ReviewsTab } from "@/features/reviews/components/ReviewsTab";
import { useToggleWishlist } from "@/features/wishlist/hooks/useToggleWishlist";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useIsMobile } from "@/hooks/useIsMobile";
import { loadQuery } from "@/lib/api/load-query";
import { setUserIntent } from "@/stores/slices/user-slice";
import { store } from "@/stores/store";
import { CheckoutType } from "@/types/checkout";
import { createProductDescription, createProductTitle } from "@/utils/seo";

export const productPageLoader = ({ params }: LoaderFunctionArgs) => {
  const { productSlug } = params;

  if (!productSlug) {
    throw new Response("Product not found", { status: 404 });
  }
  const productId = Number(productSlug.split("-p-")[1]);

  if (!Number.isInteger(productId)) {
    throw new Response("Product not found", { status: 404 });
  }

  return loadQuery(
    store.dispatch(getProductDetailsApi.endpoints.getProductDetails.initiate(productId)),
  );
};

export const ProductPage = () => {
  const productData = useLoaderData<typeof productPageLoader>();

  // Navigating between products reuses this route's component, so key the view
  // to start each product with fresh image and quantity state.
  return <ProductView key={productData.id} />;
};

const ProductView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const productData = useLoaderData<typeof productPageLoader>();

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState(productData.thumbnail);

  const { addToCart, isLoading: isAddingToCart } = useAddToCart();
  const [addToBuyNowCart, { isLoading: isNavigatingToCheckout }] = useCreateBuyNowCartMutation();

  const [togglingProductId, setTogglingProductId] = useState<number | null>(null);
  const { handleToggleWishlist } = useToggleWishlist();

  const handleWishlistToggle = async (id: number) => {
    setTogglingProductId(id);

    try {
      await handleToggleWishlist(id);
    } finally {
      setTogglingProductId(null);
    }
  };

  const isProductToggling = (id: number) => togglingProductId === id;

  const isMobile = useIsMobile();

  const incrementQuantity = () => {
    setQuantity((prev) => (prev < 10 ? prev + 1 : prev));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);

    if (!isNaN(value)) {
      setQuantity(Math.min(Math.max(value, 1), 10));
    }
  };

  const buyNowClick = async () => {
    try {
      await addToBuyNowCart({ productId: productData.id, quantity }).unwrap();
    } catch {
      // The error middleware already reported it
      return;
    }

    dispatch(setUserIntent(CheckoutType.BUY_NOW));
    navigate(paths.checkout.root.getHref());
  };

  return (
    <>
      <PageHelmet
        title={createProductTitle(productData.productName, productData.brand)}
        description={createProductDescription(
          productData.productName,
          productData.brand,
          productData.description ?? [],
        )}
      />

      <div className="page-spacing">
        {isMobile ? (
          <ProductMobileLayout
            {...productData}
            productId={productData.id}
            averageRating={Number(productData.averageRating)}
            images={productData.productImages}
            handleAddToCart={(quantity: number) => addToCart(productData.id, quantity)}
            addingToCart={isAddingToCart || isNavigatingToCheckout}
            handleQuantityChange={handleQuantityChange}
            handleBuyNow={buyNowClick}
            isNavigatingToCheckout={isNavigatingToCheckout}
            decrementQuantity={decrementQuantity}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            incrementQuantity={incrementQuantity}
            onRatingClick={() => {}}
            quantity={quantity}
            onWishlistToggle={handleToggleWishlist}
          />
        ) : (
          <ProductDesktopLayout
            {...productData}
            productId={productData.id}
            averageRating={Number(productData.averageRating)}
            images={productData.productImages}
            handleAddToCart={(quantity: number) => addToCart(productData.id, quantity)}
            addingToCart={isAddingToCart}
            handleQuantityChange={handleQuantityChange}
            handleBuyNow={buyNowClick}
            isNavigatingToCheckout={isNavigatingToCheckout}
            decrementQuantity={decrementQuantity}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            incrementQuantity={incrementQuantity}
            onRatingClick={() => {}}
            quantity={quantity}
            onWishlistToggle={handleToggleWishlist}
          />
        )}

        <ProductTabs productDescription={productData.description ?? []}>
          <ReviewsTab productId={Number(productData.id)} />
        </ProductTabs>

        <SuggestedProducts
          id={productData.id}
          onWishlistToggle={handleWishlistToggle}
          isTogglingWishlist={isProductToggling}
        />
      </div>
    </>
  );
};
