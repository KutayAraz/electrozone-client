import { forwardRef } from "react";

import { ProductCard } from "@/components/ui/product-card/product-card";

import { Product, ProductListProps } from "./models";

export const ProductList = forwardRef(({ products }: ProductListProps, ref: any) => {
  return (
    <div className="flex grow flex-wrap">
      {products.map((product: Product, index: number) => {
        const isThirdToLast = index === products.length - 3;
        return (
          <ProductCard
            key={product.id}
            ref={isThirdToLast ? ref : null}
            id={product.id}
            thumbnail={product.thumbnail}
            productName={product.productName}
            brand={product.brand}
            averageRating={product.averageRating}
            price={product.price}
            stock={product.stock}
            subcategory={product.subcategory}
            category={product.category}
          />
        );
      })}
    </div>
  );
});

ProductList.displayName = "ProductList";
