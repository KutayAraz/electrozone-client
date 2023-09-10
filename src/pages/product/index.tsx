import { Await, defer, json, useLoaderData, useParams } from "react-router-dom";
import { Suspense, useState } from "react";
import Product from "./components/Product";
import { store } from "@/setup/store";
import fetchNewAccessToken from "@/utils/fetch-access-token";
import Review from "./components/review-list/Review";
import ReviewForm from "./components/ReviewForm";
import { hydrationCompleted } from "@/setup/slices/hydration-slice";
import { checkHydration } from "@/utils/check-hydration";

const ProductPage = () => {
  const { product, reviews, wishlisted, canCurrentUserReview }: any =
    useLoaderData();

  const params = useParams();
  const productId = params.productId as string;

  const [productWishlist, setProductWishlist] = useState<boolean>(wishlisted);

  const updateWishlistStatus = (isWishlisted: boolean) => {
    setProductWishlist(isWishlisted);
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Await
        resolve={Promise.all([product, wishlisted])}
        children={([productData]) => (
          <Product
            id={productData.id}
            productName={productData.productName}
            thumbnail={productData.thumbnail}
            images={productData.productImages}
            brand={productData.brand}
            description={productData.description}
            price={productData.price}
            stock={productData.stock}
            averageRating={productData.averageRating}
            subcategory={productData.subcategory}
            category={productData.category}
            isWishlisted={productWishlist}
            updateWishlistStatus={updateWishlistStatus}
          />
        )}
      />
      <Await
        resolve={canCurrentUserReview}
        children={(resolvedCanCurrentUserReview) => (
          <ReviewForm
            canCurrentUserReview={resolvedCanCurrentUserReview}
            productId={productId}
          />
        )}
      />
      <Await
        resolve={reviews}
        children={(resolvedReviews) =>
          resolvedReviews.map((review: any) => (
            <Review
              key={review.id}
              id={review.id}
              reviewDate={review.reviewDate}
              rating={review.rating}
              comment={review.comment}
            />
          ))
        }
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
    `${import.meta.env.VITE_API_URL}/products/${productId}/wishlist`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.ok) {
    return await response.json();
  }
}

async function loadReviews(productId: string) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/reviews/${productId}/reviews`,
    {
      method: "GET",
    }
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

const canCurrentUserReview = async (productId: string) => {
  await checkHydration(store);
  const isSignedIn = store.getState().user.isSignedIn;
  if (!isSignedIn) {
    return false;
  }

  let accessToken = store.getState().auth.accessToken;

  if (!accessToken) {
    accessToken = await fetchNewAccessToken();
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/reviews/${productId}/canReview`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.ok) {
    return true;
  } else {
    return false;
  }
};

export async function loader({ params }: any) {
  const productId = params.productId;
  return defer({
    product: loadProduct(productId),
    wishlisted: await checkWishlist(productId),
    reviews: loadReviews(productId),
    canCurrentUserReview: await canCurrentUserReview(productId),
  });
}
