import ProductCard from "./ProductCard";
import { Product, SubcategoryProps } from "./models";

const Subcategory = ({
  subcategoryName,
  topSelling,
  topWishlisted,
}: SubcategoryProps) => {
  return (
    <div>
      <h3>Top Selling Products in {subcategoryName}</h3>
      {topSelling.map((product: Product) => (
        <ProductCard
          subcategoryName={subcategoryName}
          id={product.id}
          thumbnail={product.thumbnail}
          productName={product.thumbnail}
        />
      ))}
      <h3>Top Wishlisted Productsin {subcategoryName}</h3>
      {topWishlisted.map((product: Product) => (
        <ProductCard
          subcategoryName={subcategoryName}
          id={product.id}
          thumbnail={product.thumbnail}
          productName={product.thumbnail}
        />
      ))}
    </div>
  );
};

export default Subcategory;
