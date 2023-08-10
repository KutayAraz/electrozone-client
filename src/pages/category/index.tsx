import { Suspense } from "react";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import Subcategory from "./components/Subcategory";

export const CategoryPage = () => {
  const { category }: any = useLoaderData();

  return (
    <div>
      <h1>Hello</h1>
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
  console.log(categoryName);
  const response = await fetch(
    "http://localhost:3000/categories/" + categoryName
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch the category." },
      {
        status: 500,
      }
    );
  } else {
    const resp = await response.json();
    console.log(resp[0].topSelling);
    return resp;
  }
}

export function loader({ params }: any) {
  const category = params.category.replace(/-/g, "_");
  return defer({
    category: loadSubcategory(category),
  });
}
