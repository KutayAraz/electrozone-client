import { Await, defer, json, useLoaderData } from "react-router-dom";
import ProductList from "./components/ProductList";
import { Suspense } from "react";

const Products = () => {
  const { products }: any = useLoaderData();

  return (
    <div>
      <h1>Products</h1>
      <Suspense fallback={<p>Loading Products..</p>}>
        <Await resolve={products}>
          {(loadedProducts) => <ProductList products={loadedProducts} />}
        </Await>
      </Suspense>
    </div>
  );
};

export default Products;

async function loadProducts(subcategory: string) {
  const response = await fetch("http://localhost:3000/subcategories/" + subcategory);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    return await response.json();
  }
}

export function loader({  params }: any) {
  const subcategories = params.subcategories.split("/");
  const subcategory = subcategories[subcategories.length - 1];
  return defer({
    products: loadProducts(subcategory),
  });
}
