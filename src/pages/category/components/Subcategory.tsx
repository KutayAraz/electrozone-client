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
    <div className="m-[1%]" key={id}>
      <h3 className="text-xl font-semibold text-gray-700 mb-3 m-[1%]">
        Top Selling Products in{" "}
        <Link to={`${subcategory}`} className="underline">
          {subcategory.toUpperCase()}
        </Link>
      </h3>
      <div className="flex flex-wrap">
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
          />
        ))}
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-4 m-[1%]">
        Top Wishlisted Products in{" "}
        <Link to={`${subcategory}`} className="underline">
          {subcategory.toUpperCase()}
        </Link>
      </h3>
      <div className="flex flex-wrap">
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
          />
        ))}
      </div>
    </div>
  );
};

export default Subcategory;
