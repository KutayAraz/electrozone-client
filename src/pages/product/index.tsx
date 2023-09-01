import { Await, defer, json, useLoaderData } from "react-router-dom";
import { ProductProps, ReviewsProps } from "./models";
import { Suspense } from "react";
import Product from "./components/Product";
import Reviews from "./components";
import { store } from "@/setup/store";

const ProductPage = () => {
  const { product, reviews, wishlisted }: any = useLoaderData();

  return (
    <Suspense fallback={<p>Loading...</p>}>
       <Await
        resolve={Promise.all([product, wishlisted])}
        children={([productData, wishlistedData]) => (
          <Product
            id={productData.id}
            productName={productData.productName}
            thumbnail={productData.thumbnail}
            brand={productData.brand}
            description={productData.description}
            price={productData.price}
            stock={productData.stock}
            averageRating={productData.averageRating}
            isWishlisted={wishlistedData}
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

async function checkWishlist(productId: string) {
  const isSignedIn = store.getState().user.isSignedIn;
  if (!isSignedIn) {
    return false;
  }
  const response = await fetch(
    `http://localhost:3000/products/${productId}/wishlist`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );

  if(response.status === 200){
    return await response.json()
  }
}

async function loadReviews(productId: string) {
  const response = await fetch(
    `http://localhost:3000/reviews/${productId}/reviews`
  );

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
  return defer({
    product: loadProduct(productId),
    reviews: loadReviews(productId),
    wishlisted: checkWishlist(productId),
  });
}
