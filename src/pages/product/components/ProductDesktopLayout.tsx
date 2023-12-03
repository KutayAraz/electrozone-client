import { Rating } from "@mui/material";
import WishlistButton from "./WishlistButton";
import { ProductLayoutProps } from "./models";
import { useState } from "react";
import { ReactComponent as NavigationButton } from "@assets/svg/navigation.svg";

const ProductDesktopLayout = ({
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
  isWishlisted,
  toggleWishlist,
}: ProductLayoutProps) => {
  const allImages = [{ productImage: thumbnail }, ...images];
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [hoveredImage, setHoveredImage] = useState(null);

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
    <div className="flex w-full my-6 h-[700px]">
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
          onMouseLeave={() => setHoveredImage(null)}
        >
          {allImages
            .slice(startIndex, startIndex + 5)
            .map((image: any, index: number) => (
              <img
                key={index}
                src={image.productImage}
                alt={`image for ${productName}`}
                className={`object-contain cursor-pointer h-28 w-28 rounded-[10px] ${
                  (hoveredImage ? hoveredImage : selectedImage) ===
                  image.productImage
                    ? "border-1 border-theme-blue"
                    : ""
                }`}
                onMouseOver={() => setHoveredImage(image.productImage)}
                onClick={() => {
                  setSelectedImage(image.productImage);
                }}
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
      <div className="flex flex-grow items-center justify-center ml-2 lg:ml-0">
        <button onClick={prevImage}>
          <NavigationButton className="w-6 h-16 rotate-180 mr-2" />
        </button>
        <div className="flex flex-grow items-center justify-center h-[640px] max-w-[640px] border-1 border-gray-300 rounded-md">
          <img
            src={hoveredImage ? hoveredImage : selectedImage}
            alt={`image for ${productName}`}
            className="w-auto h-auto rounded-[6px] object-contain max-h-[640px]"
          />
        </div>
        <button onClick={nextImage}>
          <NavigationButton className="w-6 h-16 ml-2" />
        </button>
      </div>

      {/* Third Child Div - Product Details and Actions */}
      <div className="flex flex-col w-[30%] text-center m-auto border-1 py-6 border-gray-300 rounded-md h-[640px] justify-evenly lg:justify-center lg:space-y-3 px-2">
        <h2 className="text-lg">{productName}</h2>
        <p className="font-[500] ">Brand: {brand}</p>
        <a href="#rating" className="mx-auto">
          <Rating
            name="half-rating-read"
            value={averageRating}
            precision={0.1}
            readOnly
            className="mt-4"
          />
        </a>
        <p className="text-lg font-[500]">${price}</p>
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
              className={`${
                addingToCart ? "bg-gray-300" : "bg-theme-blue hover:bg-blue-600"
              } w-full px-4 py-2  text-white rounded-xl my-4`}
            >
              {addingToCart ? "Adding To Cart.." : "Add to Cart"}
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full px-4 py-2 bg-orange-300 hover:bg-orange-400  rounded-xl"
            >
              Buy now
            </button>
          </div>
        ) : (
          <p className="text-red-500">This product is currently out of stock</p>
        )}
        <div className="flex flex-col justify-center items-center">
          <WishlistButton
            isWishlisted={isWishlisted}
            toggleWishlist={toggleWishlist}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDesktopLayout;

{
  /* <div className="flex-grow h-96 relative w-96">
          <img
            src={selectedImage}
            alt={`image for ${productName}`}
            className="object-contain absolute top-0 left-0 right-0 bottom-0 m-auto max-h-96 max-w-96 rounded-[5px]"
          />
        </div> */
}
