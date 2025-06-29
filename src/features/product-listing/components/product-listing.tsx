import { forwardRef } from "react";

import { ProductCard } from "@/components/ui/product-card";

interface ProductListProps {
  products: any[];
  loading?: boolean;
  onAddToCart: (productId: number) => void;
  onWishlistToggle: (productId: number) => void;
  isAddingToCart: (productId: number) => boolean;
  isTogglingWishlist: (productId: number) => boolean;
}

export const ProductList = forwardRef<HTMLDivElement, ProductListProps>(
  ({ products, onAddToCart, onWishlistToggle, isAddingToCart, isTogglingWishlist }, ref) => {
    return (
      <>
        {products.map((product: any, index: number) => {
          const isLastElement = index === products.length - 1;

          return (
            <ProductCard
              key={product.id}
              ref={isLastElement ? ref : null}
              id={product.id}
              thumbnail={product.thumbnail}
              productName={product.productName}
              brand={product.brand}
              averageRating={product.averageRating}
              price={product.price}
              stock={product.stock}
              subcategory={product.subcategory}
              category={product.category}
              onAddToCart={() => onAddToCart(product.id)}
              onWishlistToggle={() => onWishlistToggle(product.id)}
              isAddingToCart={isAddingToCart(product.id)}
              isTogglingWishlist={isTogglingWishlist(product.id)}
            />
          );
        })}
      </>
    );
  },
);

ProductList.displayName = "ProductList";
