import { Product, ProductListProps } from "./models";
import ProductCard from "./ProductCard";

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex max-w-screen-lg flex-wrap mx-auto px-2">
      {products.map((product: Product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          thumbnail={product.thumbnail}
          productName={product.productName}
          brand={product.brand}
          averageRating={product.averageRating}
          price={product.price}
          subcategory={product.subcategory}
          category={product.category}
        />
      ))}
    </div>
  );
};

export default ProductList;
