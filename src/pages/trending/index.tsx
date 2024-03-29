import loaderFetch from "@/utils/loader-fetch";
import { Suspense } from "react";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";
import { capitalizeWords } from "@/utils/capitalize-words";
import ProductCard from "@/common/ProductCard";

const Trending = () => {
  const { products }: any = useLoaderData();
  const params = useParams();

  return (
    <div className="page-spacing">
      <h4 className="font-bold text-2xl ml-2 my-3">
        {capitalizeWords(params.type?.replace(/-/g, " ") || "")} Site-Wide
      </h4>
      <Suspense fallback={<p>Loading Products..</p>}>
        <div className="flex flex-wrap">
          <Await
            resolve={products}
            children={(resolvedProducts) => {
              return resolvedProducts.map((product: any) => (
                <ProductCard
                  key={product.id}
                  subcategory={product.subcategory}
                  category={product.category}
                  id={product.id}
                  thumbnail={product.thumbnail}
                  productName={product.productName}
                  brand={product.brand}
                  averageRating={product.averageRating}
                  price={product.price}
                  className=""
                />
              ));
            }}
          />
        </div>
      </Suspense>
    </div>
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
