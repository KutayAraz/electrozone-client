import { Suspense } from "react";
import { useLoaderData, useParams, Await, LoaderFunctionArgs, defer } from "react-router-dom";

import PageHelmet from "@/components/seo/page-helmet";
import { Spinner } from "@/components/ui/spinner/spinner";
import { formatString } from "@/utils/format-casing";
import loaderFetch from "@/utils/loader-fetch";

import { Subcategory, SubcategoryProps } from "../../features/catalog/components/subcategory";

export const CategoryPage = () => {
  const { category } = useLoaderData() as { category: Promise<SubcategoryProps[]> };
  const { category: categoryParam } = useParams<{ category: string }>();
  const formattedCategory = categoryParam ? formatString(categoryParam, "-") : "Category";

  return (
    <>
      <PageHelmet
        title={`${formattedCategory} | Electrozone`}
        description="Browse products by category to find exactly what you're looking for at Electrozone."
      />
      <div className="page-spacing">
        <Suspense fallback={<Spinner />}>
          <Await resolve={category}>
            {(loadedCategory) =>
              loadedCategory.map((subcategory: SubcategoryProps) => (
                <Subcategory
                  key={subcategory.id}
                  id={subcategory.id}
                  subcategory={subcategory.subcategory}
                  topSelling={subcategory.topSelling}
                  topWishlisted={subcategory.topWishlisted}
                />
              ))
            }
          </Await>
        </Suspense>
      </div>
    </>
  );
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const categoryName = params?.category?.replace(/-/g, "_");

  if (!categoryName) throw new Error("Category parameter is required");

  const category = await loaderFetch(`${import.meta.env.VITE_API_URL}/category/` + categoryName);
  return defer({
    category: category.data,
  });
};
