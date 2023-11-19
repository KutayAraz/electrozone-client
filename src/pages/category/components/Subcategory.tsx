import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { CategoryProductProps, SubcategoryProps } from "./models";

const Subcategory = ({
  subcategoryName,
  topSelling,
  topWishlisted,
  id,
}: SubcategoryProps) => {
  return (
    <div className="m-[1%]" key={id}>
      <h3 className="text-xl font-semibold text-gray-700 mb-3 m-[1%]">
        Top Selling Products in{" "}
        <Link to={`${subcategoryName}`} className="underline">
          {subcategoryName.toUpperCase()}
        </Link>
      </h3>
      <div className="flex flex-wrap">
        {topSelling.map((product: CategoryProductProps) => (
          <ProductCard
            key={product.id}
            subcategoryName={subcategoryName}
            id={product.id}
            thumbnail={product.thumbnail}
            productName={product.productName}
            brand={product.brand}
            averageRating={product.averageRating}
            price={product.price}
          />
        ))}
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-4 m-[1%]">
        Top Wishlisted Products in{" "}
        <Link to={`${subcategoryName}`} className="underline">
          {subcategoryName.toUpperCase()}
        </Link>
      </h3>
      <div className="flex flex-wrap">
        {topWishlisted.map((product: CategoryProductProps) => (
          <ProductCard
            key={product.id}
            subcategoryName={subcategoryName}
            id={product.id}
            thumbnail={product.thumbnail}
            productName={product.productName}
            brand={product.brand}
            averageRating={product.averageRating}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Subcategory;
