import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import Subcategory from "./components/Subcategory";
import loaderFetch from "@/utils/loader-fetch";

export const CategoryPage = () => {
  const { category }: any = useLoaderData();

  return (
    <div>
      <Suspense fallback={<p>Loading Category..</p>}>
        <Await resolve={category}>
          {(loadedCategory) =>
            loadedCategory.map((subcategory: any, index: number) => (
              <Subcategory
                key={index}
                subcategoryName={subcategory.subcategory}
                topSelling={subcategory.topSelling}
                topWishlisted={subcategory.topWishlisted}
              />
            ))
          }
        </Await>
      </Suspense>
    </div>
  );
};

export default CategoryPage;

export const loader = async ({ params }: any) => {
  const categoryName = params.category.replace(/-/g, "_");
  const category = await loaderFetch(
    `${import.meta.env.VITE_API_URL}/categories/` + categoryName
  );
  return defer({
    category,
  });
};
