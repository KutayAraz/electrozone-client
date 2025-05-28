import { forwardRef } from "react";

import { ProductCard } from "@/components/ui/product-card";

interface ProductListProps {
  products: any[];
  loading?: boolean;
}

export const ProductList = forwardRef<HTMLDivElement, ProductListProps>(({ products }, ref) => {
  return (
    <>
      {products.map((product: any, index: number) => {
        const isLastElement = index === products.length - 1;

        return (
          <ProductCard
            key={product.id}
            ref={isLastElement ? ref : null}
            productId={product.id}
            thumbnail={product.thumbnail}
            productName={product.productName}
            brand={product.brand}
            averageRating={product.averageRating}
            price={product.price}
            stock={product.stock}
            subcategory={product.subcategory}
            category={product.category}
            onAddToCart={() => {}}
            onWishlistToggle={() => {}}
            isAddingToCart={false}
            isTogglingWishlist={false}
          />
        );
      })}
    </>
  );
});

ProductList.displayName = "ProductList";
