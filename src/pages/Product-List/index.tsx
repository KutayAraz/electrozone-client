import ProductCard from "./components/ProductCard";
import { ProductCardProps } from "./models";

const ProductList = () => {
  const products: ProductCardProps[] = [];

  return (
    <div className="flex">
      {products.map((product) => (
        <ProductCard
          image={product.image}
          name={product.name}
          avgRating={product.avgRating}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductList;
