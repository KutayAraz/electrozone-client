import { Suspense } from "react";
import { Await, defer, useLoaderData } from "react-router-dom";
import { ReactComponent as PrevArrow } from "@assets/svg/prev-arrow.svg";
import { ReactComponent as NextArrow } from "@assets/svg/next-arrow.svg";
import ProductCard from "./components/ProductCard";
import loaderFetch from "@/utils/loader-fetch";
import Categories from "./components/Categories";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SliderProductCard from "@/common/SliderProductCard/SliderProductCard";
import { SliderProductCardProps } from "@/common/SliderProductCard/models";

const HomePage = () => {
  const {
    bestRatedProducts,
    mostWishlistedProducts,
    bestSellingProducts,
  }: any = useLoaderData();

  const settings = {
    infinite: false,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    draggable: true,
    swipe: true,
    nextArrow: <NextArrow className="w-10 h-10" />,
    prevArrow: <PrevArrow className="w-10 h-10" />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col max-w-screen-xl mx-[8%] xl:mx-auto text-center">
        <Categories />
        <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-700">
          Best Selling Products
        </h2>
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={bestSellingProducts}
            children={(products: SliderProductCardProps[]) => (
              <Slider
                {...settings}
                lazyLoad="ondemand"
                className="mb-5"
              >
                {products.map((product: SliderProductCardProps) => (
                  <SliderProductCard
                    key={product.id}
                    id={product.id}
                    productName={product.productName}
                    brand={product.brand}
                    thumbnail={product.thumbnail}
                    price={product.price}
                    subcategory={product.subcategory}
                    category={product.category}
                  />
                ))}
              </Slider>
            )}
          />
        </Suspense>

        <h2 className="text-xl font-semibold my-3 text-gray-700">
          Most Wishlisted Products
        </h2>
        <Suspense fallback={<p>Loading..</p>}>
          <Await
            resolve={mostWishlistedProducts}
            children={(products: SliderProductCardProps[]) => (
              <Slider
                {...settings}
                lazyLoad="ondemand"
                className="mb-5"
              >
                {products.map((product: SliderProductCardProps) => (
                  <SliderProductCard
                    key={product.id}
                    id={product.id}
                    productName={product.productName}
                    brand={product.brand}
                    thumbnail={product.thumbnail}
                    price={product.price}
                    subcategory={product.subcategory}
                    category={product.category}
                  />
                ))}
              </Slider>
            )}
          />
        </Suspense>

        <h2 className="text-xl font-semibold my-3 text-gray-700">
          Best Rated Products
        </h2>
        <Suspense fallback={<p>Loading..</p>}>
          <Await
            resolve={bestRatedProducts}
            children={(products: SliderProductCardProps[]) => (
              <Slider
                {...settings}
                lazyLoad="ondemand"
                className="mb-5"
              >
                {products.map((product: SliderProductCardProps) => (
                  <SliderProductCard
                    key={product.id}
                    id={product.id}
                    productName={product.productName}
                    brand={product.brand}
                    thumbnail={product.thumbnail}
                    price={product.price}
                    subcategory={product.subcategory}
                    category={product.category}
                  />
                ))}
              </Slider>
            )}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default HomePage;
const fetchProducts = async (url: string) => {
  const result = await loaderFetch(
    `${import.meta.env.VITE_API_URL}/products/${url}`,
    "GET"
  );
  return result.data;
};

const loadBestRatedProducts = () => fetchProducts("top-rated");
const loadMostWishlistedProducts = () => fetchProducts("most-wishlisted");
const loadMostSoldProducts = () => fetchProducts("best-sellers");

export const loader = async () => {
  return defer({
    bestRatedProducts: loadBestRatedProducts(),
    mostWishlistedProducts: loadMostWishlistedProducts(),
    bestSellingProducts: loadMostSoldProducts(),
  });
};
