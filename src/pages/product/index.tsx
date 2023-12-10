import {
  Await,
  defer,
  redirect,
  useLoaderData,
  useLocation,
  useParams,
} from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import Product from "./components/Product";
import { store } from "@/setup/store";
import Review from "./components/Review";
import ReviewForm from "./components/ReviewForm";
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

  const location = useLocation();

  // useEffect(() => {
  //   if (location.hash === "#rating") {
  //     const observer = new MutationObserver((mutations, obs) => {
  //       const reviewsSection = document.getElementById("rating");
  //       if (reviewsSection) {
  //         reviewsSection.scrollIntoView({ behavior: "smooth" });
  //         obs.disconnect(); // Stop observing once we have found the element
  //       }
  //     });

  //     observer.observe(document, {
  //       childList: true,
  //       subtree: true,
  //     });

  //     return () => observer.disconnect();
  //   }
  // }, [location.hash]);

  const [productWishlist, setProductWishlist] = useState<boolean>(wishlisted);

  const updateWishlistStatus = (isWishlisted: boolean) => {
    setProductWishlist(isWishlisted);
  };

  const scrollToReviews = () => {
    const reviewsSection = document.getElementById("rating");
    if (reviewsSection) {
      reviewsSection.scrollIntoView({ behavior: "smooth" });
    }
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
            onRatingClick={scrollToReviews}
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
      <section id="rating" className="max-w-screen-xl mx-[2%] xl:mx-auto">
        <h4 className="underline text-lg font-[500] mb-6">Customer Reviews</h4>
        <Await
          resolve={reviews}
          children={(resolvedReviews) =>
            resolvedReviews.length === 0 ? (
              <p className="italic mb-4">This product has no reviews yet.</p>
            ) : (
              <div className="mb-8">
                {resolvedReviews.map((review: any) => (
                  <Review
                    key={review.id}
                    id={review.id}
                    reviewDate={review.reviewDate}
                    rating={review.rating}
                    comment={review.comment}
                  />
                ))}
              </div>
            )
          }
        />
      </section>
    </Suspense>
  );
};

export default ProductPage;

// const API_URL = import.meta.env.VITE_API_URL;

// async function fetchData(endpoint: string, method: any, useAuth = false, request: any = null) {
//   const fetchFunction = useAuth ? loaderFetchProtected : loaderFetch;
//   const result = await fetchFunction(`${API_URL}${endpoint}`, method, request);
//   return result.data;
// }

// async function isUserSignedIn() {
//   await checkHydration(store);
//   return store.getState().user.isSignedIn;
// }

// export const loader = async ({ request, params }: any) => {
//   try {
//     const { productId } = params;
//     const isLoggedIn = await isUserSignedIn();

//     // Fetch product and reviews concurrently
//     const [product, reviews] = await Promise.all([
//       fetchData(`/products/${productId}`, "GET"),
//       fetchData(`/reviews/${productId}/reviews`, "GET")
//     ]);

//     let wishlisted = false;
//     let canReview = false;

//     if (isLoggedIn) {
//       // Fetch wishlist status and review permission concurrently for logged-in users
//       [wishlisted, canReview] = await Promise.all([
//         fetchData(`/products/${productId}/wishlist`, "GET", true, request),
//         (async () => {
//           try {
//             const result = await fetchData(`/reviews/${productId}/canReview`, "GET", true, request);
//             return result === true;
//           } catch (error) {
//             if (error instanceof UnauthorizedError) throw error;
//             return false;
//           }
//         })()
//       ]);
//     }

//     return defer({
//       product,
//       wishlisted,
//       reviews,
//       canCurrentUserReview: canReview
//     });
//   } catch (error: unknown) {
//     console.log("err", error);
//     if (error instanceof UnauthorizedError) {
//       return redirect("/sign-in");
//     }
//     throw error;
//   }
// };

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
