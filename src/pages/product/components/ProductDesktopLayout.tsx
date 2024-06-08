import { Modal, Rating } from "@mui/material";
import WishlistButton from "./WishlistButton";
import { ProductLayoutProps } from "./models";
import { useState } from "react";
import { ReactComponent as NavigationButton } from "@assets/svg/navigation.svg";
import { ReactComponent as CloseButton } from "@assets/svg/modal-close.svg";
import { ReactComponent as NavigationArrow } from "@assets/svg/previous-arrow.svg";

const ProductDesktopLayout = ({
  productId,
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
  isInitiallyWishlisted,
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
    <div className="flex w-full h-[700px] my-2">
      {/* First Child Div - Image Thumbnails */}
      <div className="flex flex-col flex-shrink-0 items-center justify-center">
        {/* Scroll Up Button or Spacer */}
        {startIndex > 0 ? (
          <button onClick={scrollUp}>
            <NavigationButton className="w-6 h-6 rotate-[270deg] mb-2" />
          </button>
        ) : (
          <div className="w-6 h-6 mb-2"></div>
        )}

        <div
          className="flex flex-col space-y-2 flex-grow"
        >
          {allImages
            .slice(startIndex, startIndex + 5)
            .map((image: any, index: number) => (
              <img
                key={index}
                src={image.productImage}
                alt={`image for ${productName}`}
                className={`object-contain cursor-pointer h-28 w-28 p-2 rounded-[10px] ${selectedImage ===
                  image.productImage
                  ? "border-1 border-theme-blue"
                  : ""
                  }`}
                onMouseOver={() => setSelectedImage(image.productImage)}
              />
            ))}
        </div>

        {/* Scroll Down Button or Spacer */}
        {startIndex < allImages.length - 5 ? (
          <button onClick={scrollDown}>
            <NavigationButton className="w-6 h-6 rotate-90 mt-2" />
          </button>
        ) : (
          <div className="w-6 h-6 mt-2"></div>
        )}
      </div>

      {/* Second Child Div - Large Selected Image */}
      <div className="flex flex-grow items-center justify-center lg:ml-0">
        <button onClick={prevImage}>
          <NavigationButton className="w-6 h-16 rotate-180 m-2" />
        </button>
        <div onClick={handleModalOpen} className="flex flex-grow items-center hover:cursor-pointer justify-center h-[640px] max-w-[640px] border-1 border-gray-300 rounded-md">
          <img
            src={selectedImage}
            alt={`image for ${productName}`}
            className="w-auto h-auto rounded-[6px] object-contain max-h-[640px] p-2 lg:p-4"
          />
        </div>
        <button onClick={nextImage} className="m">
          <NavigationButton className="w-6 h-16 m-2" />
        </button>
        <Modal
          open={isModalOpen}
          onClose={handleModalClose}
          className="flex items-center justify-center p-4"
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="relative bg-white rounded-lg w-[50vw] h-[90vh] overflow-auto">
            {/* Container for navigation buttons */}
            <button onClick={handleModalClose} className="absolute top-2 right-2 hover:cursor-pointer z-20">
              <CloseButton className="w-8 h-auto" />
            </button>
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between z-10">
              <button onClick={prevImage} className="m-2">
                <NavigationArrow className="w-14 h-14" />
              </button>
              <button onClick={nextImage} className="m-2">
                <NavigationArrow className="w-14 h-14 rotate-180" />
              </button>
            </div>
            <img
              src={selectedImage}
              alt={`image for ${productName}`}
              className="h-full w-auto object-contain mx-auto py-4"
            />
          </div>
        </Modal>
      </div>

      {/* Third Child Div - Product Details and Actions */}
      <div className="flex flex-col w-[25%] lg:w-[30%] text-center m-auto border-1 py-6 border-gray-300 rounded-md h-[640px] justify-evenly lg:justify-center lg:space-y-3 px-2 flex-shrink-0">
        <h2 className="text-lg">{productName}</h2>
        <p className="font-[500]">Brand: {brand}</p>
        <div onClick={onRatingClick} className="mx-auto hover:cursor-pointer">
          <Rating
            name="half-rating-read"
            value={averageRating}
            precision={0.1}
            readOnly
            className="mt-4"
          />
        </div>
        <p className="text-lg font-bold">${price}</p>
        <div className="flex justify-center mb-4 items-center s">
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
          <div className="flex flex-col w-[80%] mx-auto">
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className={`${addingToCart ? "bg-gray-300" : "bg-theme-blue hover:bg-blue-900"
                } w-full px-4 py-2 text-white rounded-xl my-4`}
            >
              {addingToCart ? "Adding To Cart.." : "Add to Cart"}
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full px-4 py-2 bg-orange-300 hover:bg-orange-400 rounded-xl"
            >
              Buy now
            </button>
          </div>
        ) : (
          <label className="text-red-500 border-1 rounded-xl">This product is currently out of stock</label>
        )}
        <div className="flex flex-col justify-center items-center">
          <WishlistButton isInitiallyWishlisted={isInitiallyWishlisted} productId={productId} productName={productName}/>
        </div>
      </div>
    </div>
  );
};

export default ProductDesktopLayout;