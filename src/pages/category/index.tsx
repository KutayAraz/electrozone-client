import { Suspense } from "react";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";
import Subcategory from "./components/Subcategory";
import loaderFetch from "@/utils/loader-fetch";
import { SubcategoryProps } from "./components/models";
import PageHelmet from "@/components/seo/page-helmet";
import { formatString } from "@/utils/format-casing";

export const CategoryPage = () => {
  const { category }: any = useLoaderData();
  const params: any = useParams()

  return (
    <>
      <PageHelmet title={`${formatString(params.category, "-")} | Electrozone`} description="Browse products by category to find exactly what you're looking for at Electrozone." />
      <div className="page-spacing">
        <Suspense fallback={<p>Loading Category..</p>}>
          <Await resolve={category}>
            {(loadedCategory) =>
              loadedCategory.map((subcategory: SubcategoryProps, index: number) => (
                <Subcategory
                  key={index}
                  id={index}
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

export const loader = async ({ params }: any) => {
  const categoryName = params.category.replace(/-/g, "_");
  const category = await loaderFetch(
    `${import.meta.env.VITE_API_URL}/categories/` + categoryName
  );
  return defer({
    category: category.data,
  });
};
