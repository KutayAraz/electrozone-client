import { Product, ProductListProps } from "./models";
import ProductCard from "./ProductCard";

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex max-w-screen-lg flex-wrap mx-auto">
      {products.map((product: Product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          thumbnail={product.thumbnail}
          productName={product.productName}
          brand={product.brand}
          avgRating={product.averageRating}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductList;
