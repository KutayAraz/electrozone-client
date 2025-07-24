import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { LoaderFunctionArgs, useLoaderData, useNavigate } from "react-router";

import { paths } from "@/config/paths";
import { useCreateBuyNowCartMutation } from "@/features/cart/api/buy-now-cart/create-buy-now-cart";
import { useAddToCart } from "@/features/cart/hooks/use-add-to-cart";
import { SuggestedProducts } from "@/features/product-listing/components/suggested-products";
import { getProductDetailsApi } from "@/features/products/api/get-product-details";
import { ProductDesktopLayout } from "@/features/products/components/product-desktop-layout";
import { ProductMobileLayout } from "@/features/products/components/product-mobile-layout";
import { ProductTabs } from "@/features/products/components/product-page-tabs";
import { ReviewsTab } from "@/features/reviews/components/reviews-tab";
import { useToggleWishlist } from "@/features/wishlist/hooks/use-toggle-wishlist";
import { useAppDispatch } from "@/hooks/use-app-dispatch";
import { CheckoutIntent } from "@/stores/slices/models";
import { setUserIntent } from "@/stores/slices/user-slice";
import { store } from "@/stores/store";

export const productPageLoader = async ({ params }: LoaderFunctionArgs) => {
  const { productSlug } = params;

  if (!productSlug) {
    throw new Response("Product not found", { status: 404 });
  }
  const [, productId] = productSlug.split("-p-");

  return await store
    .dispatch(getProductDetailsApi.endpoints.getProductDetails.initiate(Number(productId)))
    .unwrap();
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

  const handleWishlistToggle = async (id: number) => {
    setTogglingProductId(id);

    try {
      await handleToggleWishlist(id);
    } finally {
      setTogglingProductId(null);
    }
  };

  const isProductToggling = (id: number) => togglingProductId === id;

  const isMobile = useMediaQuery("(min-width:768px)");

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
    dispatch(setUserIntent(CheckoutIntent.BUY_NOW));
    await addToBuyNowCart({ productId: productData.id, quantity: 1 }).unwrap();
    navigate(paths.checkout.root.getHref());
  };

  return (
    <div className="page-spacing">
      {isMobile ? (
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
      ) : (
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
  );
};
