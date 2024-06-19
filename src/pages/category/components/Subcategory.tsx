import { Link } from "react-router-dom";
import { SubcategoryProps } from "./models";
import { formatString } from "@/utils/format-casing";
import ProductCarousel from "@/common/ProductCarousel";

const Subcategory = ({
  subcategory,
  topSelling,
  topWishlisted,
  id,
}: SubcategoryProps) => {

  return (
    <div className="px-6 md:px-8 xl:px-0" key={id}>
      <h3 className="text-lg font-semibold text-center mb-3">
        Top Selling Products in{" "}
        <Link to={`${subcategory}`} className="underline hover:text-blue-800">
          {formatString(subcategory, "_")}
        </Link>
      </h3>
      <ProductCarousel products={topSelling.products} className="mb-5" />
      <h3 className="text-lg font-semibold mb-3 text-center">
        Top Wishlisted Products in{" "}
        <Link to={`${subcategory}`} className="underline hover:text-blue-800">
          {formatString(subcategory, "_")}
        </Link>
      </h3>
      <ProductCarousel products={topWishlisted.products} className="mb-5" />
    </div>
  );
};

export default Subcategory;
