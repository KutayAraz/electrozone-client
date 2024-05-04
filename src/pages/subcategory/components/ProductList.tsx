import ProductCard from "@/common/ProductCard";
import { Product, ProductListProps } from "./models";
import { forwardRef } from "react";

const ProductList = forwardRef(({ products }: ProductListProps, ref: any) => {
  return (
    <div className="flex flex-wrap flex-grow">
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
        )
      })}
    </div>
  );
});

export default ProductList;
