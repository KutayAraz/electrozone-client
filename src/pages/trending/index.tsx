import { Suspense } from "react";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";

import PageHelmet from "@/components/seo/page-helmet";
import { ProductCard } from "@/components/ui/product-card/product-card";
import { formatString } from "@/utils/format-casing";
import loaderFetch from "@/utils/loader-fetch";

export const Trending = () => {
  const { products }: any = useLoaderData();
  const { type }: any = useParams();

  return (
    <>
      <PageHelmet
        title={`${formatString(type, "-")} | Electrozone`}
        description="Browse trending electronics and gadgets at Electrozone, updated daily to showcase the latest in tech."
      />
      <div className="page-spacing">
        <h4 className="my-3 ml-2 text-xl font-bold">{formatString(type, "-") || ""} Site-Wide</h4>
        <Suspense fallback={<p>Loading Products..</p>}>
          <div className="flex flex-wrap">
            <Await resolve={products}>
              {products.map((product: any) => (
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
              ))}
            </Await>
          </div>
        </Suspense>
      </div>
    </>
  );
};

export const loader = async ({ params }: any) => {
  const trend = params.type;

  const result = await loaderFetch(`${import.meta.env.VITE_API_URL}/products/${trend}`, "GET");

  return defer({
    products: result.data,
  });
};
