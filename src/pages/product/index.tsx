import { Await, defer, json, useLoaderData } from "react-router-dom";
import { ProductProps, ReviewsProps } from "./models";
import { Suspense, useState } from "react";
import Product from "./components/Product";
import Reviews from "./components";
import { store } from "@/setup/store";
import fetchNewAccessToken from "@/utils/fetch-access-token";

const ProductPage = () => {
  const { product, reviews, wishlisted }: any = useLoaderData();

  const [productWishlist, setProductWishlist] = useState<boolean>(wishlisted);

  const updateWishlistStatus = (isWishlisted: boolean) => {
    setProductWishlist(isWishlisted);
  };

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
            isWishlisted={productWishlist}
            updateWishlistStatus={updateWishlistStatus}
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
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/products/${productId}`
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

async function checkWishlist(productId: string) {
  const isSignedIn = store.getState().user.isSignedIn;
  if (!isSignedIn) {
    return false;
  }

  let accessToken = store.getState().auth.accessToken;

  if (!accessToken) {
    accessToken = await fetchNewAccessToken();
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/${productId}/wishlist`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  console.log(response.status);

  if (response.status === 200) {
    const resp = await response.json();
    console.log(resp);
    return resp;
  }
}

async function loadReviews(productId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/reviews/${productId}/reviews`
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

export async function loader({ params }: any) {
  const productId = params.productId;
  return defer({
    product: loadProduct(productId),
    reviews: loadReviews(productId),
    wishlisted: await checkWishlist(productId),
  });
}
