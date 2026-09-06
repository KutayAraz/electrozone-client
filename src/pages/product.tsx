import { useEffect, useState } from "react";
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

export const productPageLoader = async ({ params }: LoaderFunctionArgs) => {
  const { productSlug } = params;

  if (!productSlug) {
    throw new Response("Product not found", { status: 404 });
  }
  const [, productId] = productSlug.split("-p-");

  return loadQuery(
    store.dispatch(getProductDetailsApi.endpoints.getProductDetails.initiate(Number(productId))),
  );
};

export const ProductPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const productData = useLoaderData();

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState(productData.thumbnail);

  const { addToCart, isLoading: isAddingToCart } = useAddToCart();
  const [addToBuyNowCart, { isLoading: isNavigatingToCheckout }] = useCreateBuyNowCartMutation();

  const [togglingProductId, setTogglingProductId] = useState<number | null>(null);
  const { handleToggleWishlist } = useToggleWishlist();

  useEffect(() => {
    setSelectedImage(productData.thumbnail);
    setQuantity(1);
  }, [productData.thumbnail]);

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
    setQuantity((prev) => (prev < 10 ? ++prev : prev));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? --prev : prev));
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);

    if (!isNaN(value)) {
      setQuantity(value > 10 ? 10 : value);
    }
  };

  const buyNowClick = async () => {
    dispatch(setUserIntent(CheckoutType.BUY_NOW));
    await addToBuyNowCart({ productId: productData.id, quantity: 1 }).unwrap();
    navigate(paths.checkout.root.getHref());
  };

  return (
    <>
      <PageHelmet
        title={createProductTitle(productData.productName, productData.brand)}
        description={createProductDescription(
          productData.productName,
          productData.brand,
          productData.description,
        )}
      />

      <div className="page-spacing">
        {isMobile ? (
          <ProductMobileLayout
            {...productData}
            productId={productData.id}
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

        <ProductTabs productDescription={productData.description}>
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
