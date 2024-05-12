import { Link } from "react-router-dom";
import { SubcategoryProps } from "./models";
import ProductCard from "@/pages/home/components/ProductCard";
import { ReactComponent as PrevArrow } from "@assets/svg/prev-arrow.svg";
import { ReactComponent as NextArrow } from "@assets/svg/next-arrow.svg";
import Slider from "react-slick";
import SliderProductCard from "@/common/SliderProductCard/SliderProductCard";
import { formatString } from "@/utils/format-casing";

const Subcategory = ({
  subcategory,
  topSelling,
  topWishlisted,
  id,
}: SubcategoryProps) => {
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
    <div className="px-6 md:px-8 xl:px-0" key={id}>
      <h3 className="text-lg font-semibold text-center mb-3">
        Top Selling Products in{" "}
        <Link to={`${subcategory}`} className="underline hover:text-blue-800">
          {formatString(subcategory)}
        </Link>
      </h3>
      <Slider
        {...settings}
        className="mb-5"
      >
        {topSelling.products.map((product) => (
          <SliderProductCard
            key={product.id}
            category={product.category}
            subcategory={product.subcategory}
            id={product.id}
            thumbnail={product.thumbnail}
            productName={product.productName}
            brand={product.brand}
            price={product.price}
          />
        ))}</Slider>

      <h3 className="text-lg font-semibold mb-3 text-center">
        Top Wishlisted Products in{" "}
        <Link to={`${subcategory}`} className="underline hover:text-blue-800">
          {formatString(subcategory)}
        </Link>
      </h3>
      <Slider
        {...settings}
        className="mb-5"
      >
        {topWishlisted.products.map((product) => (
          <SliderProductCard
            key={product.id}
            category={product.category}
            subcategory={product.subcategory}
            id={product.id}
            thumbnail={product.thumbnail}
            productName={product.productName}
            brand={product.brand}
            price={product.price}
          />
        ))}
      </Slider>
    </div>
  );
};

export default Subcategory;
