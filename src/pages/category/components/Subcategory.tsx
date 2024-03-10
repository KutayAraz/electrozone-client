import { Link } from "react-router-dom";
import { SubcategoryProps } from "./models";
import ProductCard, { ProductCardProps } from "@/common/ProductCard";

const Subcategory = ({
  subcategory,
  topSelling,
  topWishlisted,
  id,
}: SubcategoryProps) => {
  return (
    <div className="" key={id}>
      <h3 className="text-xl font-semibold text-center mb-3">
        Top Selling Products in{" "}
        <Link to={`${subcategory}`} className="underline">
          {subcategory.toUpperCase()}
        </Link>
      </h3>
      <div className="flex flex-wrap justify-center lg:justify-between">
        {topSelling.map((product: ProductCardProps) => (
          <ProductCard
            key={product.id}
            category={product.category}
            subcategory={product.subcategory}
            id={product.id}
            thumbnail={product.thumbnail}
            productName={product.productName}
            brand={product.brand}
            averageRating={product.averageRating}
            price={product.price}
            className="w-1/2 xs:w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4"
          />
        ))}
      </div>

      <h3 className="text-xl font-semibold mb-3 text-center">
        Top Wishlisted Products in{" "}
        <Link to={`${subcategory}`} className="underline">
          {subcategory.toUpperCase()}
        </Link>
      </h3>
      <div className="flex flex-wrap justify-center lg:justify-between">
        {topWishlisted.map((product: ProductCardProps) => (
          <ProductCard
            key={product.id}
            category={product.category}
            subcategory={product.subcategory}
            id={product.id}
            thumbnail={product.thumbnail}
            productName={product.productName}
            brand={product.brand}
            averageRating={product.averageRating}
            price={product.price}
            className="w-1/2 xs:w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4"

          />
        ))}
      </div>
    </div>
  );
};

export default Subcategory;
