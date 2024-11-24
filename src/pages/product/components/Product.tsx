import { Link, useNavigate } from "react-router-dom";
import { ProductProps } from "./models";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "@/stores/slices/local-cart-slice";
import { useState } from "react";
import { addtoBuyNowCart } from "@/stores/slices/buynow-cart-slice";
import { setUserIntent, updateCartItemCount } from "@/stores/slices/user-slice";
import { CheckoutIntent } from "@/stores/slices/models";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { displayAlert } from "@/stores/slices/alert-slice";
import { RootState } from "@/stores/store";
import useFetch from "@/hooks/use-fetch";
import { capitalizeWords } from "@/utils/capitalize-words";
import { Divider, useMediaQuery } from "@mui/material";
import ProductMobileLayout from "./ProductMobileLayout";
import ProductDesktopLayout from "./ProductDesktopLayout";
import { truncateString } from "@/utils/truncate-string";

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
      setQuantity(value > 25 ? 25 : value);
    }
  };

  const handleAddToCart = async () => {
    if (isSignedIn) {
      const result = await fetchData(
        `${import.meta.env.VITE_API_URL}/cart/user/item`,
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
      // dispatch(addItemToCart({ id, quantity }));
      const result = await fetchData(
        `${import.meta.env.VITE_API_URL}/cart/session`,
        "POST",
        { productId: id, quantity },
        false,
        true,
        "addToCart"
      );
    }

    dispatch(
      displayAlert({
        type: "success",
        message: `${truncateString(productName, 0, 20)} has been added to your cart!`,
        autoHide: true,
      })
    );
  };

  const handleBuyNow = async () => {
    dispatch(addtoBuyNowCart({ id, quantity }));
    dispatch(setUserIntent(CheckoutIntent.BUY_NOW));
    if (!isSignedIn) {
      navigate("/sign-in", { state: { from: "/checkout" } });
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className="mt-4 max-w-screen-xl mx-auto">
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
      <Divider sx={{ borderBottomWidth: 1.5, marginTop: 3 }} />
    </div>
  );
};

export default Product;
