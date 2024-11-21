import loaderFetch from "@/utils/loader-fetch";
import { Suspense } from "react";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";
import ProductCard from "@/common/ProductCard";
import { formatString } from "@/utils/format-casing";
import PageHelmet from "@/components/page-helmet";

const Trending = () => {
  const { products }: any = useLoaderData();
  const { type }: any = useParams();

  return (
    <>
      <PageHelmet title={`${formatString(type, "-")} | Electrozone`} description="Browse trending electronics and gadgets at Electrozone, updated daily to showcase the latest in tech." />
      <div className="page-spacing">
        <h4 className="font-bold text-xl ml-2 my-3">
          {formatString(type, "-") || ""} Site-Wide
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
                    stock={product.stock}
                    className=""
                  />
                ));
              }}
            />
          </div>
        </Suspense>
      </div>
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
