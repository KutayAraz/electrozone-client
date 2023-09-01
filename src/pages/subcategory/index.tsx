import { Await, defer, json, useLoaderData } from "react-router-dom";
import ProductList from "./components/ProductList";
import { Suspense } from "react";

const SubcategoryPage = () => {
  const { subcategory }: any = useLoaderData();

  return (
    <div>
      <h1>Products</h1>
      <Suspense fallback={<p>Loading Products..</p>}>
        <Await resolve={subcategory}>
          {(loadedProducts) => <ProductList products={loadedProducts} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default SubcategoryPage;

async function loadSubcategory(subcategory: string) {
  const response = await fetch(
    `http://localhost:3000/subcategories/${subcategory}/featured`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  console.log(response);
  if (response.status === 200) {
    return await response.json();
  }
}

export function loader({ params }: any) {
  const subcategory = params.subcategory;
  return defer({
    subcategory: loadSubcategory(subcategory),
  });
}
