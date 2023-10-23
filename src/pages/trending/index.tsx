import loaderFetch from "@/utils/loader-fetch";
import { Suspense } from "react";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";
import ProductCard from "../category/components/ProductCard";
import { capitalizeWords } from "@/utils/capitalize-words";

const Trending = () => {
  const { products }: any = useLoaderData();
  const params = useParams();

  return (
    <>
      <h4 className="font-semibold text-gray-700 text-2xl mx-[2%] my-3">
        {capitalizeWords(params.type?.replace(/-/g, " ") || "")} Site-Wide
      </h4>
      <Suspense fallback={<p>Loading Products..</p>}>
        <div className="mx-[1%] flex flex-wrap">
          <Await
            resolve={products}
            children={(resolvedProducts) => {
              return resolvedProducts.map((product: any) => (
                <ProductCard
                  key={product.id}
                  subcategoryName={product.subcategoryName}
                  id={product.id}
                  thumbnail={product.thumbnail}
                  productName={product.productName}
                  brand={product.brand}
                  averageRating={product.averageRating}
                  price={product.price}
                />
              ));
            }}
          />
        </div>
      </Suspense>
    </>
  );
};

export default Trending;

export const loader = async ({ params }: any) => {
  const trend = params.type;

  const result = await loaderFetch(
    `${import.meta.env.VITE_API_URL}/products/${trend}`,
    "GET"
  );

  return defer({
    products: result.data,
  });
};
