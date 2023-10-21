import ProductCard from "./ProductCard";
import { CategoryProductProps, SubcategoryProps } from "./models";

const Subcategory = ({
  subcategoryName,
  topSelling,
  topWishlisted,
}: SubcategoryProps) => {
  return (
    <div className="m-[2%]">
      <h3 className="text-xl font-semibold text-gray-700 ">
        Top Selling Products in {subcategoryName.toUpperCase()}
      </h3>
      {topSelling.map((product: CategoryProductProps) => (
        <ProductCard
          subcategoryName={subcategoryName}
          id={product.id}
          thumbnail={product.thumbnail}
          productName={product.productName}
          price={product.price}
        />
      ))}
      <h3 className="text-xl font-semibold text-gray-700 p-[2%]">
        Top Wishlisted Productsin {subcategoryName.toUpperCase()}
      </h3>
      {topWishlisted.map((product: CategoryProductProps) => (
        <ProductCard
          subcategoryName={subcategoryName}
          id={product.id}
          thumbnail={product.thumbnail}
          productName={product.productName}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default Subcategory;
