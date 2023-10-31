import Slider from "react-slick";
import WishlistButton from "./WishlistButton";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";
import { ProductLayoutProps } from "./models";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductMobileLayout = ({
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
  averageRating,
  isWishlisted,
  toggleWishlist,
}: ProductLayoutProps) => {
  return (
    <>
      <h2 className="text sm:text-xl text-center">{productName}</h2>
      <p className="font-[500] sm:text-lg mb-4 text-center">Brand: {brand}</p>
      <Slider
        dots={true}
        dotsClass="slick-dots"
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        className="block sm:hidden"
      >
        <img
          src={thumbnail}
          alt={`thumbnail image for ${productName}`}
          className="object-contain w-64 h-64 mb-4 sm:mb-0"
        />
        {images?.map((image: any) => (
          <div key={image.id}>
            <img
              src={image.productImage}
              alt={`image for ${productName}`}
              className="w-64 h-64 object-contain mx-auto"
              onClick={() => setSelectedImage(image.productImage)}
            />
          </div>
        ))}
      </Slider>

      <div className="flex flex-col text-left sm:text-center w-full sm:w-auto">
        <Link to={"#rating"} className="mt-10 mx-auto">
          <Rating
            name="half-rating-read"
            value={averageRating}
            precision={0.1}
            readOnly
          />
        </Link>
        <p className="text-lg sm:text-xl mb-2 text-center mt-2">${price}</p>
        <div className="flex justify-center mb-4">
          <button
            onClick={decrementQuantity}
            className="px-2 py-1 border rounded"
          >
            -
          </button>
          <input
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            max={10}
            className="text-center w-16 mx-2 border rounded"
          />
          <button
            onClick={incrementQuantity}
            className="px-2 py-1 border rounded"
          >
            +
          </button>
        </div>
        {stock > 0 ? (
          <div className="flex flex-col mb-4 w-[80%] mx-auto">
            <button
              onClick={handleAddToCart}
              className=" sm:w-auto px-4 py-2 bg-theme-blue text-white rounded-xl mb-2"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full sm:w-auto px-4 py-2 bg-theme-orange text-white rounded-xl"
            >
              Buy now
            </button>
          </div>
        ) : (
          <p className="text-red-500">This product is currently out of stock</p>
        )}
        <div className="flex flex-col justify-center items-center mb-4">
          <WishlistButton
            isWishlisted={isWishlisted}
            toggleWishlist={toggleWishlist}
          />
        </div>
      </div>
    </>
  );
};

export default ProductMobileLayout;
