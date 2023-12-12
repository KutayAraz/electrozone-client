import Slider from "react-slick";
import WishlistButton from "./WishlistButton";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { ProductLayoutProps } from "./models";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductMobileLayout = ({
  productId,
  productName,
  brand,
  thumbnail,
  images,
  setSelectedImage,
  price,
  quantity,
  decrementQuantity,
  handleQuantityChange,
  incrementQuantity,
  stock,
  handleAddToCart,
  handleBuyNow,
  addingToCart,
  averageRating,
  isInitiallyWishlisted,
  onRatingClick
}: ProductLayoutProps) => {
  return (
    <>
      <h2 className="text sm:text-xl text-center">{productName}</h2>
      <p className="font-[500] sm:text-lg mb-4 text-center">Brand: {brand}</p>
      <Slider
        dots={true}
        dotsClass="slick-dots"
        arrows={false}
        infinite={true}
        speed={500}
        lazyLoad={"ondemand"}
        slidesToShow={1}
        slidesToScroll={1}
        className=""
      >
        <div>
          <img
            src={thumbnail}
            alt={`thumbnail image for ${productName}`}
            className="object-contain h-[40vh] w-auto mx-auto"
          />
        </div>

        {images?.map((image: any) => (
          <div key={image.id}>
            <img
              src={image.productImage}
              alt={`image for ${productName}`}
              className="object-contain h-[40vh] w-auto mx-auto"
              onClick={() => setSelectedImage(image.productImage)}
            />
          </div>
        ))}
      </Slider>

      <div className="flex py-4 items-center justify-around fixed bottom-0 left-0 right-0 w-full bg-gray-100">
        <p className="text-lg sm:text-xl ml-2">${price}</p>
        <div className="flex">
          <button
            onClick={decrementQuantity}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            max={10}
            className="text-center w-10 mx-[4px] border rounded"
          />
          <button
            onClick={incrementQuantity}
            className="px-2 py-1 border border-gray-300 rounded"
          >
            +
          </button>
        </div>
        {stock > 0 ? (
          <button
            onClick={handleAddToCart}
            disabled={addingToCart}
            className={`${addingToCart ? "bg-gray-400" : "bg-theme-blue"} sm:w-auto px-4 py-2 text-white rounded-md`}
          >
            {addingToCart ? "Adding To Cart.." : "Add to Cart"}
          </button>
        ) : (
          <p className="text-red-500">Out of stock</p>
        )}
      </div>

      <div className="flex flex-col text-left sm:text-center w-full sm:w-auto">
        <div onClick={onRatingClick} className="mt-10 mx-auto">
          <Rating
            name="half-rating-read"
            value={averageRating}
            precision={0.1}
            readOnly
            className="mt-4"
          />
        </div>
        <button
          onClick={handleBuyNow}
          className="w-[80%] mx-auto my-2 sm:w-auto px-4 py-2 bg-theme-orange text-white rounded-md"
        >
          Buy now
        </button>
        <div className="flex flex-col justify-center items-center mb-4">
          <WishlistButton isInitiallyWishlisted={isInitiallyWishlisted} productId={productId} />
        </div>
      </div>
    </>
  );
};

export default ProductMobileLayout;
