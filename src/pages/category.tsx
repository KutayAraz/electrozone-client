import { PageHelmet } from "@/components/seo/page-helmet";
import { Spinner } from "@/components/ui/spinner";
import { categoryInfoApi } from "@/features/catalog/api/get-category-info";
import { Subcategory, SubcategoryProps } from "@/features/catalog/components/subcategory";
import { useWishlistToggle } from "@/features/wishlist/hooks/use-toggle-wishlist";
import { store } from "@/stores/store";
import { formatString } from "@/utils/format-casing";
import { LoaderFunctionArgs, useLoaderData, useParams } from "react-router";

export const CategoryPage = () => {
  const categoryData = useLoaderData();

  const handleToggleWishlist = useWishlistToggle();

  const { category: categoryParam } = useParams<{ category: string }>();
  const formattedCategory = categoryParam ? formatString(categoryParam, "-") : "Category";

  const handleWishlistToggle = async (id: number) => {
    await handleToggleWishlist(id);
  };

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
              onWishlistToggle={handleWishlistToggle}
            />
          ))
        )}
      </div>
    </>
  );
};

export const categoryLoader = async ({ params }: LoaderFunctionArgs) => {
  const categoryName = params?.category?.replace(/-/g, "_");

  if (!categoryName) {
    throw new Error("Category parameter is required");
  }

  return store.dispatch(categoryInfoApi.endpoints.getCategoryInfo.initiate(categoryName));
};
