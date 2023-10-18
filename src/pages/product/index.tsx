import {
  Await,
  defer,
  json,
  redirect,
  useLoaderData,
  useParams,
} from "react-router-dom";
import { Suspense, useState } from "react";
import Product from "./components/Product";
import { store } from "@/setup/store";
import fetchNewAccessToken from "@/utils/renew-token";
import Review from "./components/review-list/Review";
import ReviewForm from "./components/ReviewForm";
import { hydrationCompleted } from "@/setup/slices/hydration-slice";
import { checkHydration } from "@/utils/check-hydration";
import loaderFetch from "@/utils/loader-fetch";
import {
  UnauthorizedError,
  loaderFetchProtected,
} from "@/utils/loader-fetch-protected";

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
            price={productData.price.toFixed(2)}
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
      <section id="rating" className="my-4 ml-[4%]">
        <h4 className="mb-2 underline">Reviews</h4>
        <Await
          resolve={reviews}
          children={(resolvedReviews) =>
            resolvedReviews.length === 0 ? (
              <p className="text-sm ">This product has no reviews yet.</p>
            ) : (
              resolvedReviews.map((review: any) => (
                <Review
                  key={review.id}
                  id={review.id}
                  reviewDate={review.reviewDate}
                  rating={review.rating}
                  comment={review.comment}
                />
              ))
            )
          }
        />
      </section>
    </Suspense>
  );
};

export default ProductPage;

async function loadProduct(productId: string) {
  const result = await loaderFetch(
    `${import.meta.env.VITE_API_URL}/products/${productId}`,
    "GET"
  );
  return result.data;
}

async function checkWishlist({ request, productId }: any) {
  const isSignedIn = store.getState().user.isSignedIn;

  if (!isSignedIn) {
    return false;
  }

  const result = await loaderFetchProtected(
    `${import.meta.env.VITE_API_URL}/products/${productId}/wishlist`,
    "GET",
    request
  );

  return result.data;
}

async function loadReviews(productId: string) {
  const response = await loaderFetch(
    `${import.meta.env.VITE_API_URL}/reviews/${productId}/reviews`,
    "GET"
  );

  return response.data;
}

async function canCurrentUserReview({ request, productId }: any) {
  await checkHydration(store);
  const isSignedIn = store.getState().user.isSignedIn;
  if (!isSignedIn) {
    return false;
  }
  try {
    const result = await loaderFetchProtected(
      `${import.meta.env.VITE_API_URL}/reviews/${productId}/canReview`,
      "GET",
      request
    );

    return result === true;
  } catch (error: unknown) {
    if (error instanceof UnauthorizedError) {
      throw error;
    }
    if (
      error instanceof Error &&
      "status" in error &&
      (error as any).status === 400
    ) {
      return false;
    }
    throw error;
  }
}

async function isUserSignedIn() {
  return store.getState().user.isSignedIn;
}

export const loader = async ({ request, params }: any) => {
  try {
    const productId = params.productId;

    await checkHydration(store);

    const productPromise = loadProduct(productId);
    const reviewsPromise = loadReviews(productId);

    let wishlistedPromise = Promise.resolve(false);
    let canReviewPromise = Promise.resolve(false);

    if (await isUserSignedIn()) {
      wishlistedPromise = checkWishlist({ request, productId });
      canReviewPromise = canCurrentUserReview({ request, productId });
    }

    const [product, reviews, wishlisted, canReview] = await Promise.all([
      productPromise,
      reviewsPromise,
      wishlistedPromise,
      canReviewPromise,
    ]);

    return defer({
      product,
      wishlisted,
      reviews,
      canCurrentUserReview: canReview,
    });
  } catch (error: unknown) {
    console.log("err", error);
    if (error instanceof UnauthorizedError) {
      return redirect("/sign-in");
    }
    throw error;
  }
};
