import { Rating } from "@mui/material";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { WishlistHeart } from "@/components/ui/wishlist-heart";
import { useAppSelector } from "@/hooks/use-app-selector";
import type { RootState } from "@/stores/store";

import { ProductLayoutProps } from "../types";

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
  isNavigatingToCheckout,
  addingToCart,
  averageRating,
  onRatingClick,
  onWishlistToggle,
}: ProductLayoutProps) => {
  const wishlist = useAppSelector((state: RootState) => state.wishlist);
  const isWishlisted = wishlist.items.includes(productId);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onWishlistToggle(productId);
  };

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
        <div className="absolute right-2 top-2 z-20">
          <WishlistHeart
            onClick={handleWishlistToggle}
            isWishlisted={isWishlisted}
            className="scale-125 bg-white/80 backdrop-blur-sm rounded-full p-1"
          />
        </div>
        <SwiperSlide key={thumbnail} className="flex items-center justify-center">
          <img
            src={thumbnail}
            alt={`thumbnail for ${productName}`}
            className="h-[40vh] w-auto object-contain"
          />
        </SwiperSlide>

        {images?.map((image: any) => (
          <SwiperSlide key={image.id} className="flex items-center justify-center">
            <button
              onClick={() => setSelectedImage(image.productImage)}
              className="flex items-center justify-center h-full w-full"
            >
              <img
                src={image.productImage}
                alt={productName}
                className="h-[40vh] w-auto object-contain"
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
            onClick={() => handleAddToCart(quantity)}
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
          {isNavigatingToCheckout ? "Navigating to checkout" : "Buy now"}
        </button>
      </div>
    </>
  );
};
