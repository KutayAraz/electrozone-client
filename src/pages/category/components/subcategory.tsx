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

type ProductSectionProps = {
  title: string;
  subcategory: string;
  products: ProductCardProps[];
};

const ProductSection = ({ title, subcategory, products }: ProductSectionProps) => (
  <>
    <h3 className="mb-3 text-center text-lg font-semibold">
      {title}{" "}
      <Link to={subcategory} className="underline hover:text-blue-800">
        {formatString(subcategory, "_")}
      </Link>
    </h3>
    <Carousel products={products} className="mb-5" />
  </>
);

export const Subcategory = ({ subcategory, topSelling, topWishlisted }: SubcategoryProps) => (
  <div className="px-6 md:px-8 xl:px-0">
    <ProductSection
      title="Top Selling Products in"
      subcategory={subcategory}
      products={topSelling.products}
    />
    <ProductSection
      title="Top Wishlisted Products in"
      subcategory={subcategory}
      products={topWishlisted.products}
    />
  </div>
);
