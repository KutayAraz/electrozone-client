import { Suspense } from "react";
import { Await, ParamParseKey, Params, defer, useLoaderData } from "react-router-dom";
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

async function loadSubcategory(categoryName: string) {
  return await loaderFetch(
    `${import.meta.env.VITE_API_URL}/categories/` + categoryName
  );
}

export function loader({ params }: any) {
  const category = params.category.replace(/-/g, "_");
  return defer({
    category: loadSubcategory(category),
  });
}
