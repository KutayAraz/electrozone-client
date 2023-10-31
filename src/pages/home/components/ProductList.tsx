import Slider from "react-slick";
import ProductCard from "./ProductCard";
import { ReactComponent as Arrow } from "@assets/svg/navigation.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductList = ({ products }: any) => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    nextArrow: <Arrow className="w-8 h-auto" />,
    prevArrow: <Arrow className="w-8 h-auto" />,
    slidesToScroll: 4,
    initialSlide: 0,
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
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <>
      <Slider {...settings} className="">
        {products.map((product: any) => (
          <ProductCard
            id={product.id}
            productName={product.productName}
            thumbnail={product.thumbnail}
            subcategory={product.subcategory}
            category={product.category}
          />
        ))}
      </Slider>
    </>
  );
};

export default ProductList;
