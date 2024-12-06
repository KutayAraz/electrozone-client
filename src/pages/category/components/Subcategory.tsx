import { Link } from "react-router-dom";

import { Carousel } from "@/components/ui/carousel/carousel";
import { ProductCardProps } from "@/components/ui/product-card/product-card";
import { formatString } from "@/utils/format-casing";

export type SubcategoryProps = {
  id: number;
  subcategory: string;
  topSelling: { products: ProductCardProps[]; productQuantity: number };
  topWishlisted: { products: ProductCardProps[]; productQuantity: number };
};

export const Subcategory = ({ subcategory, topSelling, topWishlisted, id }: SubcategoryProps) => {
  return (
    <div className="px-6 md:px-8 xl:px-0" key={id}>
      <h3 className="mb-3 text-center text-lg font-semibold">
        Top Selling Products in{" "}
        <Link to={`${subcategory}`} className="underline hover:text-blue-800">
          {formatString(subcategory, "_")}
        </Link>
      </h3>
      <Carousel products={topSelling.products} className="mb-5" />
      <h3 className="mb-3 text-center text-lg font-semibold">
        Top Wishlisted Products in{" "}
        <Link to={`${subcategory}`} className="underline hover:text-blue-800">
          {formatString(subcategory, "_")}
        </Link>
      </h3>
      <Carousel products={topWishlisted.products} className="mb-5" />
    </div>
  );
};
