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
    "http://localhost:3000/subcategories/" + subcategory
  );
  if (!response.ok) {
    throw json(
      { message: "Could not fetch products." },
      {
        status: 500,
      }
    );
  } else {
    const resp = await response.json();
    console.log(resp)
    return resp
  }
}

export function loader({ params }: any) {
  const subcategory = params.subcategory;
  return defer({
    subcategory: loadSubcategory(subcategory),
  });
}
