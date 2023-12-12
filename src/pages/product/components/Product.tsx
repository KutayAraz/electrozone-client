import { Link, useNavigate } from "react-router-dom";
import { ProductProps } from "./models";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "@/setup/slices/localCart-slice";
import { useState } from "react";
import { addtoBuyNowCart } from "@/setup/slices/buyNowCart-slice";
import { setUserIntent, updateCartItemCount } from "@/setup/slices/user-slice";
import { CheckoutIntent } from "@/setup/slices/models";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { displayAlert } from "@/setup/slices/alert-slice";
import { RootState } from "@/setup/store";
import useFetch from "@/common/Hooks/use-fetch";
import { capitalizeWords } from "@/utils/capitalize-words";
import { Divider, useMediaQuery } from "@mui/material";
import ProductMobileLayout from "./ProductMobileLayout";
import ProductDesktopLayout from "./ProductDesktopLayout";

const Product = ({
  id,
  productName,
  brand,
  thumbnail,
  images,
  description,
  averageRating,
  price,
  stock,
  category,
  subcategory,
  isInitiallyWishlisted,
  onRatingClick,
}: ProductProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState(thumbnail);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
  const { fetchData, isLoading } = useFetch();
  const modifiedCategory = capitalizeWords(category.replace(/_/g, " "));
  const modifiedSubcategory = capitalizeWords(subcategory.replace(/_/g, " "));
  const isMobile = useMediaQuery("(max-width: 768px)");

  const incrementQuantity = () => {
    setQuantity((prev) => (prev < 10 ? ++prev : prev));
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? --prev : prev));
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setQuantity(value > 10 ? 10 : value);
    }
  };

  const handleAddToCart = async () => {
    if (isSignedIn) {
      const result = await fetchData(
        `${import.meta.env.VITE_API_URL}/carts/user-cart`,
        "POST",
        { productId: id, quantity },
        true,
        false,
        "addToCart"
      );
      if (result?.response.ok)
        dispatch(
          updateCartItemCount({ cartItemCount: result.data.totalQuantity })
        );
    } else {
      dispatch(addItemToCart({ id, quantity }));
    }

    dispatch(
      displayAlert({
        type: "success",
        message: "Product has been added to your cart!",
        autoHide: true,
      })
    );
  };

  const handleBuyNow = async () => {
    dispatch(addtoBuyNowCart({ id, quantity }));
    dispatch(setUserIntent(CheckoutIntent.Instant));
    if (!isSignedIn) {
      navigate("/sign-in", { state: { from: "/checkout" } });
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="mt-4 max-w-screen-xl mx-[2%] xl:mx-auto">
      <div className="flex flex-col text-center">
        <div className="hidden sm:block text-left">
          <Link
            to={`/category/${category.replace(/-/g, "_")}`}
            className="underline"
          >
            {modifiedCategory}
          </Link>
          <span>&gt;</span>
          <Link
            to={`/category/${category.replace(/-/g, "_")}/${subcategory.replace(
              /-/g,
              "_"
            )}`}
            className="underline"
          >
            {modifiedSubcategory}
          </Link>
        </div>
      </div>
      {isMobile ? (
        <ProductMobileLayout
          productId={id}
          productName={productName}
          brand={brand}
          thumbnail={thumbnail}
          images={images}
          price={price}
          stock={stock}
          quantity={quantity}
          averageRating={averageRating}
          isInitiallyWishlisted={isInitiallyWishlisted}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          handleQuantityChange={handleQuantityChange}
          handleAddToCart={handleAddToCart}
          addingToCart={isLoading("addToCart")}
          handleBuyNow={handleBuyNow}
          setSelectedImage={setSelectedImage}
          onRatingClick={onRatingClick}
        />
      ) : (
        <ProductDesktopLayout
          productId={id}
          productName={productName}
          brand={brand}
          thumbnail={thumbnail}
          images={images}
          selectedImage={selectedImage}
          price={price}
          stock={stock}
          quantity={quantity}
          averageRating={averageRating}
          isInitiallyWishlisted={isInitiallyWishlisted}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          handleQuantityChange={handleQuantityChange}
          handleAddToCart={handleAddToCart}
          addingToCart={isLoading("addToCart")}
          handleBuyNow={handleBuyNow}
          setSelectedImage={setSelectedImage}
          onRatingClick={onRatingClick}
        />
      )}
      <Divider sx={{ borderBottomWidth: 1.5, marginY: 3 }} />
      <h3 className="underline my-2 text-lg font-[500]">Product Description</h3>
      <ul className="max-w-screen-xl" id="rating">
        {description.map((bulletPoint: string, index: number) => (
          <li className="mb-2" key={index}>
            - {bulletPoint}
          </li>
        ))}
      </ul>
      <Divider sx={{ borderBottomWidth: 1.5, marginY: 3 }} />
    </div>
  );
};

export default Product;
