import { Await, defer, json, useLoaderData } from "react-router-dom";
import { ProductProps } from "./models";
import { Suspense } from "react";
import Product from "./components/review-list/Product";

const ProductPage = () => {
  const { product } = useLoaderData() as { product: ProductProps };
  console.log(product);
  return (
    <Suspense fallback={<p>Loading..</p>}>
      <Await resolve={product}>
        {(loadedProduct) => <Product product={loadedProduct} />}
      </Await>
    </Suspense>
  );
};

export default ProductPage;

async function loadProduct(productId: string) {
  const response = await fetch("http://localhost:3000/products/" + productId);

  if (!response.ok) {
    throw json(
      { message: "Could not fetch the product." },
      {
        status: 500,
      }
    );
  } else {
    return await response.json();
  }
}

export function loader({ params }: any) {
  const productId = params.productId;
  console.log(productId);
  return defer({
    product: loadProduct(productId),
  });
}
