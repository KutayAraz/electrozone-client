import ProductCard from "@/components/ui/product-card/product-card";
import { ProductType, ProductListProps } from "./types";
import { forwardRef } from "react";

const ProductList = forwardRef(({ productsData }: ProductListProps, ref: any) => {
    return (
        <div className="flex grow flex-wrap">
            {productsData.length > 0 ? (
                productsData.map((product: ProductType, index: number) => {
                    const isThirdToLast = index === productsData.length - 3;
                    return <ProductCard
                        id={product.id}
                        key={product.id}
                        ref={isThirdToLast ? ref : null}
                        productName={product.productName}
                        brand={product.brand}
                        thumbnail={product.thumbnail}
                        price={product.price}
                        stock={product.stock}
                        averageRating={product.averageRating}
                        subcategory={product.subcategory}
                        category={product.category}
                    />
                })
            ) : (
                <p className="w-full italic">No products found.</p>
            )}
        </div>
    );
});

export default ProductList;