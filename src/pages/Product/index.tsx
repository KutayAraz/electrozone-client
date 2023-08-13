import { Await, defer, json, useLoaderData } from "react-router-dom";
import { ProductProps, ReviewsProps } from "./models";
import { Suspense } from "react";
import Product from "./components/Product";
import Reviews from "./components";

const ProductPage = () => {
  const { product, reviews }: any = useLoaderData();

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await
        resolve={product}
        children={(product) => (
          <Product
            id={product.id}
            productName={product.productName}
            thumbnail={product.thumbnail}
            brand={product.brand}
            description={product.description}
            price={product.price}
            stock={product.stock}
            averageRating={product.averageRating}
          />
        )}
      />
      <Await
        resolve={reviews}
        children={(reviews) => <Reviews reviews={reviews} />}
      />
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

async function loadReviews(productId: string) {
  const response = await fetch(
    `http://localhost:3000/products/${productId}/reviews`
  );

  if (!response.ok) {
    throw json(
      { message: "Could not fetch the product." },
      {
        status: 500,
      }
    );
  } else {
    const resp = await response.json()
    console.log(resp)
    return resp;
  }
}

export function loader({ params }: any) {
  const productId = params.productId;
  return defer({
    product: loadProduct(productId),
    reviews: loadReviews(productId),
  });
}
