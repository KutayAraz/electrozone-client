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
    return await response.json();
  }
}

export function loader({ params }: any) {
  const subcategory = params.subcategories;
  return defer({
    products: loadProducts(subcategory),
  });
}
