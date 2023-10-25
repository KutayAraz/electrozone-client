import { Rating } from "@mui/material";
import WishlistButton from "./WishlistButton";
import { Link } from "react-router-dom";
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
  handleBuyNow,
  averageRating,
  isWishlisted,
  toggleWishlist,
}: ProductLayoutProps) => {
  const allImages = [{ productImage: thumbnail }, ...images];
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

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

  return (
    <div className="flex h-full w-full my-6">
      {/* First Child Div - Image Thumbnails */}
      <div className="flex flex-col items-center justify-center w-15/100 pr-2">
        <button onClick={prevImage}>
          <NavigationButton className="w-6 h-6 rotate-[270deg] mb-2" />
        </button>
        <div className="flex flex-col space-y-2 ">
          {allImages.map((image: any, index: number) => (
            <img
              key={index}
              src={image.productImage}
              alt={`image for ${productName}`}
              className={`object-contain cursor-pointer h-20 w-20 lg:h-24 lg:w-24 rounded-[10px] ${
                selectedImage === image.productImage
                  ? "border-2 border-gray-600"
                  : "border-1 border-gray-200"
              }`}
              onClick={() => setSelectedImage(image.productImage)}
            />
          ))}
        </div>
        <button onClick={prevImage}>
          <NavigationButton className="w-6 h-6 rotate-90 mt-2" />
        </button>
      </div>

      {/* Second Child Div - Large Selected Image */}
      <div className="flex w-3/5 max-w-[720px] items-center">
        <button onClick={prevImage}>
          <NavigationButton className="w-6 h-16 rotate-180 mr-2" />
        </button>
        <div className="relative flex-grow">
          {/* This padding makes the div maintain a square shape */}
          <div style={{ paddingTop: "100%" }} className="relative w-full">
            {/* Position the image absolutely to fill the square container */}
            <img
              src={selectedImage}
              alt={`image for ${productName}`}
              className="absolute top-0 left-0 w-full h-full rounded-[6px] object-contain max-w-[720px] border-1 border-gray-300"
            />
          </div>
        </div>
        <button onClick={nextImage}>
          <NavigationButton className="w-6 h-16 ml-2 " />
        </button>
      </div>

      {/* Third Child Div - Product Details and Actions */}
      <div className="flex-grow p-4 text-center m-auto space-y-4">
        <h2 className="text-lg">{productName}</h2>
        <p className="font-[500] ">Brand: {brand}</p>
        <Link to={"#rating"} className="mr-4">
          <Rating
            name="half-rating-read"
            value={averageRating}
            precision={0.1}
            readOnly
            className="mt-4"
          />
        </Link>
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
          <div className="flex flex-col mb-4 w-[80%] mx-auto">
            <button
              onClick={handleAddToCart}
              className="w-full px-4 py-2 bg-theme-blue text-white rounded-xl mb-2"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full px-4 py-2 bg-theme-orange text-white rounded-xl"
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
    </div>
  );
};

export default ProductDesktopLayout;

        {/* <div className="flex-grow h-96 relative w-96">
          <img
            src={selectedImage}
            alt={`image for ${productName}`}
            className="object-contain absolute top-0 left-0 right-0 bottom-0 m-auto max-h-96 max-w-96 rounded-[5px]"
          />
        </div> */}