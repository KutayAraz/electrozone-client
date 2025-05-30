import { Modal, Rating } from "@mui/material";
import { useState } from "react";

import NavigationButton from "@assets/svgs/arrow-black.svg?react";
import CloseButton from "@assets/svgs/modal-close.svg?react";
import NavigationArrow from "@assets/svgs/previous-arrow.svg?react";

import { ProductLayoutProps } from "../types";

export const ProductDesktopLayout = ({
  productName,
  brand,
  thumbnail,
  images,
  setSelectedImage,
  selectedImage,
  price,
  quantity,
  decrementQuantity,
  handleQuantityChange,
  incrementQuantity,
  stock,
  handleAddToCart,
  addingToCart,
  handleBuyNow,
  averageRating,
  onRatingClick,
}: ProductLayoutProps) => {
  const allImages = [{ productImage: thumbnail }, ...images];
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [startIndex, setStartIndex] = useState<number>(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  const nextImage = () => {
    const nextIndex = (selectedIndex + 1) % allImages.length;
    setSelectedIndex(nextIndex);
    setSelectedImage(allImages[nextIndex].productImage);
  };

  const prevImage = () => {
    const prevIndex = (selectedIndex - 1 + allImages.length) % allImages.length;
    setSelectedIndex(prevIndex);
    setSelectedImage(allImages[prevIndex].productImage);
  };

  const scrollUp = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const scrollDown = () => {
    if (startIndex < allImages.length - 5) {
      setStartIndex(startIndex + 1);
    }
  };
  return (
    <div className="my-2 flex h-[700px] w-full">
      {/* First Child Div - Image Thumbnails */}
      <div className="flex shrink-0 flex-col items-center justify-center">
        {/* Scroll Up Button or Spacer */}
        {startIndex > 0 ? (
          <button onClick={scrollUp}>
            <NavigationButton className="mb-2 size-6 rotate-[270deg]" />
          </button>
        ) : (
          <div className="mb-2 size-6"></div>
        )}

        <div className="flex grow flex-col space-y-2">
          {allImages.slice(startIndex, startIndex + 5).map((image: any) => (
            <img
              key={image.id}
              src={image.productImage}
              alt={productName}
              className={`size-28 cursor-pointer rounded-[10px] object-contain p-2 ${
                selectedImage === image.productImage ? "border-1 border-theme-blue" : ""
              }`}
              onMouseOver={() => setSelectedImage(image.productImage)}
              onFocus={() => setSelectedImage(image.productImage)}
            />
          ))}
        </div>

        {/* Scroll Down Button or Spacer */}
        {startIndex < allImages.length - 5 ? (
          <button onClick={scrollDown}>
            <NavigationButton className="mt-2 size-6 rotate-90" />
          </button>
        ) : (
          <div className="mt-2 size-6"></div>
        )}
      </div>

      {/* Second Child Div - Large Selected Image */}
      <div className="flex grow items-center justify-center lg:ml-0">
        <button onClick={prevImage}>
          <NavigationButton className="m-2 h-16 w-6 rotate-180" />
        </button>
        <button
          onClick={handleModalOpen}
          className="flex h-[640px] max-w-[640px] grow items-center justify-center rounded-md border-1 border-gray-300 hover:cursor-pointer"
        >
          <img
            src={selectedImage}
            alt={productName}
            className="size-auto max-h-[640px] rounded-[6px] object-contain p-2 lg:p-4"
          />
        </button>
        <button onClick={nextImage}>
          <NavigationButton className="m-2 h-16 w-6" />
        </button>
        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          className="flex items-center justify-center p-4"
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="relative h-[90vh] w-[50vw] overflow-auto rounded-lg bg-white">
            {/* Container for navigation buttons */}
            <button
              onClick={handleModalClose}
              className="absolute right-2 top-2 z-20 hover:cursor-pointer"
            >
              <CloseButton className="h-auto w-8" />
            </button>
            <div className="absolute inset-0 z-10 flex items-center justify-between">
              <button onClick={prevImage} className="m-2">
                <NavigationArrow className="size-14" />
              </button>
              <button onClick={nextImage} className="m-2">
                <NavigationArrow className="size-14 rotate-180" />
              </button>
            </div>
            <img
              src={selectedImage}
              alt={productName}
              className="mx-auto h-full w-auto object-contain py-4"
            />
          </div>
        </Modal>
      </div>

      {/* Third Child Div - Product Details and Actions */}
      <div className="m-auto flex h-[640px] w-1/4 shrink-0 flex-col justify-evenly rounded-md border-1 border-gray-300 px-2 py-6 text-center lg:w-[30%] lg:justify-center lg:space-y-3">
        <h2 className="text-lg">{productName}</h2>
        <p className="font-[500]">Brand: {brand}</p>
        <button onClick={onRatingClick} className="mx-auto hover:cursor-pointer">
          <Rating
            name="half-rating-read"
            value={averageRating}
            precision={0.1}
            readOnly
            className="mt-4"
          />
        </button>
        <p className="text-lg font-bold">${price}</p>
        <div className="mb-4 flex items-center justify-center">
          <button onClick={decrementQuantity} className="rounded border px-2 py-1">
            -
          </button>
          <input
            type="text"
            value={quantity}
            onChange={handleQuantityChange}
            min={1}
            max={25}
            className="mx-2 w-16 rounded border text-center"
          />
          <button onClick={incrementQuantity} className="rounded border px-2 py-1">
            +
          </button>
        </div>
        {stock > 0 ? (
          <div className="mx-auto flex w-4/5 flex-col">
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className={`${
                addingToCart ? "bg-gray-300" : "bg-theme-blue hover:bg-blue-900"
              } my-4 w-full rounded-xl px-4 py-2 text-white`}
            >
              {addingToCart ? "Adding To Cart.." : "Add to Cart"}
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full rounded-xl bg-orange-300 px-4 py-2 hover:bg-orange-400"
            >
              Buy now
            </button>
          </div>
        ) : (
          <h2 className="rounded-xl border-1 text-red-500">
            This product is currently out of stock
          </h2>
        )}
        <div className="flex flex-col items-center justify-center">{/* <WishlistHeart /> */}</div>
      </div>
    </div>
  );
};
