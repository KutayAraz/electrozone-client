import { Link, LoaderFunctionArgs, useLoaderData, useParams } from "react-router";
import { SwiperSlide } from "swiper/react";

import { PageHelmet } from "@/components/seo/page-helmet";
import { Carousel } from "@/components/ui/carousel";
import { CarouselCard, CarouselCardProps } from "@/components/ui/carousel/carousel-card";
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
  const { handleToggleWishlist, isLoading } = useToggleWishlist();

  return (
    <>
      <h3 className="mb-3 text-center text-lg font-semibold">
        {title}{" "}
        <Link to={subcategory} className="underline hover:text-blue-800">
          {formatString(subcategory, "_")}
        </Link>
      </h3>
      <Carousel className="mb-5">
        {products.map((product: any) => (
          <SwiperSlide key={product.productId}>
            <CarouselCard
              key={product.id}
              productId={product.id}
              productName={product.productName}
              brand={product.brand}
              thumbnail={product.thumbnail}
              price={product.price}
              subcategory={product.subcategory}
              category={product.category}
              onWishlistToggle={handleToggleWishlist}
              isTogglingWishlist={isLoading}
            />
          </SwiperSlide>
        ))}
      </Carousel>
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
          categoryData.data.map((subcategory: SubcategoryProps) => (
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
