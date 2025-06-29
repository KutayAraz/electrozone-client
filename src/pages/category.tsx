import { useState } from "react";
import { Link, LoaderFunctionArgs, useLoaderData, useParams } from "react-router";

import { PageHelmet } from "@/components/seo/page-helmet";
import { Carousel } from "@/components/ui/carousel";
import { CarouselCardProps } from "@/components/ui/carousel/carousel-card";
import { Spinner } from "@/components/ui/spinner";
import { categoryInfoApi } from "@/features/product-listing/api/get-category-info";
import { useToggleWishlist } from "@/features/wishlist/hooks/use-toggle-wishlist";
import { store } from "@/stores/store";
import { formatString } from "@/utils/format-casing";

export const categoryLoader = async ({ params }: LoaderFunctionArgs) => {
  const categoryName = params?.category?.replace(/-/g, "_");

  if (!categoryName) {
    throw new Error("Category parameter is required");
  }

  return store.dispatch(categoryInfoApi.endpoints.getCategoryInfo.initiate(categoryName));
};

type ProductSectionProps = {
  title: string;
  subcategory: string;
  products: CarouselCardProps[];
};

const ProductSection = ({ title, subcategory, products }: ProductSectionProps) => {
  const [togglingProductId, setTogglingProductId] = useState<number | null>(null);
  const { handleToggleWishlist } = useToggleWishlist();

  const handleWishlistToggle = async (id: number) => {
    setTogglingProductId(id);

    try {
      await handleToggleWishlist(id);
    } finally {
      setTogglingProductId(null);
    }
  };

  const isProductToggling = (id: number) => togglingProductId === id;

  return (
    <>
      <h3 className="mb-3 text-center text-lg font-semibold">
        {title}{" "}
        <Link to={subcategory} className="underline hover:text-blue-800">
          {formatString(subcategory, "_")}
        </Link>
      </h3>
      <Carousel
        className="mb-5"
        products={products}
        onWishlistToggle={handleWishlistToggle}
        isTogglingWishlist={isProductToggling}
      />
    </>
  );
};

type SubcategoryProps = {
  id: number;
  subcategory: string;
  topSelling: { products: CarouselCardProps[]; productQuantity: number };
  topWishlisted: { products: CarouselCardProps[]; productQuantity: number };
};

const Subcategory = ({ subcategory, topSelling, topWishlisted }: SubcategoryProps) => (
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

type SubcategoryData = {
  id: number;
  subcategory: string;
  topSelling: { products: CarouselCardProps[]; productQuantity: number };
  topWishlisted: { products: CarouselCardProps[]; productQuantity: number };
};

export const CategoryPage = () => {
  const categoryData = useLoaderData();

  const { category: categoryParam } = useParams<{ category: string }>();
  const formattedCategory = categoryParam ? formatString(categoryParam, "-") : "Category";

  return (
    <>
      <PageHelmet
        title={`${formattedCategory} | Electrozone`}
        description="Browse products by category to find exactly what you're looking for at Electrozone."
      />
      <div className="page-spacing">
        {categoryData.state === "loading" ? (
          <Spinner />
        ) : (
          categoryData.data.map((subcategory: SubcategoryData) => (
            <Subcategory
              key={subcategory.id}
              id={subcategory.id}
              subcategory={subcategory.subcategory}
              topSelling={subcategory.topSelling}
              topWishlisted={subcategory.topWishlisted}
            />
          ))
        )}
      </div>
    </>
  );
};
