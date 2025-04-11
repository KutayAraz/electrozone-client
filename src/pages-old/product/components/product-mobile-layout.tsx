import { Rating } from "@mui/material";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { ProductLayoutProps } from "./models";
import { WishlistButton } from "./wishlist-button";

export const ProductMobileLayout = ({
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
  onRatingClick,
}: ProductLayoutProps) => {
  return (
    <>
      <h2 className="text-center">{productName}</h2>
      <p className="mb-4 text-center font-[400]">Brand: {brand}</p>
      <Swiper
        speed={500}
        slidesPerView={1}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="h-[45vh]"
      >
        <SwiperSlide key={thumbnail}>
          <img
            src={thumbnail}
            alt={`thumbnail for ${productName}`}
            className="mx-auto h-[40vh] w-auto object-contain"
          />
        </SwiperSlide>

        {images?.map((image: any) => (
          <SwiperSlide key={image.id}>
            <button onClick={() => setSelectedImage(image.productImage)}>
              <img
                src={image.productImage}
                alt={productName}
                className="mx-auto h-[40vh] w-auto object-contain"
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="fixed inset-x-0 bottom-0 z-10 flex w-full items-center justify-around bg-gray-100 py-3">
        <p className="ml-2 text-lg font-bold">${price}</p>
        <div className="flex">
          <button onClick={decrementQuantity} className="rounded border border-gray-300 px-2 py-1">
            -
          </button>
          <input
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            max={10}
            className="mx-[4px] w-10 rounded border text-center"
          />
          <button onClick={incrementQuantity} className="rounded border border-gray-300 px-2 py-1">
            +
          </button>
        </div>
        {stock > 0 ? (
          <button
            onClick={handleAddToCart}
            disabled={addingToCart}
            className={`${
              addingToCart ? "bg-gray-400" : "bg-theme-blue"
            } rounded-lg border-1 border-transparent px-4 py-2 text-white`}
          >
            {addingToCart ? "Adding To Cart.." : "Add to Cart"}
          </button>
        ) : (
          <p className="rounded-lg border-1 px-4 py-2 text-red-500 shadow-sm">Out of stock</p>
        )}
      </div>

      <div className="flex w-full flex-col text-left ">
        <button onClick={onRatingClick} className="mx-auto">
          <Rating
            name="half-rating-read"
            value={averageRating}
            precision={0.1}
            readOnly
            className="mt-4"
          />
        </button>
        <button
          onClick={handleBuyNow}
          className="mx-auto my-2 w-4/5 rounded-md bg-theme-orange px-4 py-2 text-white"
        >
          Buy now
        </button>
        <div className="mb-0 flex flex-col items-center justify-center">
          <WishlistButton
            isInitiallyWishlisted={isInitiallyWishlisted}
            productId={productId}
            productName={productName}
          />
        </div>
      </div>
    </>
  );
};
