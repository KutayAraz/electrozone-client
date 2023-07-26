import { useLoaderData } from "react-router-dom";
import Reviews from "./components/review-list";
import { ProductPageProps } from "./models";

const Product = () => {
  const {
    product: { name, brand, images, description, avgRating, price, stock },
  } = useLoaderData() as { product: ProductPageProps };
  return (
    <div className="flex">
      {images.map((image: string, index: number) => (
        <img key={index} src={image} alt={`${description} image`} />
      ))}
      <h2>{name}</h2>
      <p>{brand}</p>
      <p>{avgRating}</p>
      <p>{description}</p>
      <p>{price}</p>
      {stock > 0 ? (
        <div className="flex flex-col">
          <button>Add to basket</button>
          <button>Buy now</button>
        </div>
      ) : (
        <p>This product is currently out of stock</p>
      )}
      <button>Add to Wishlist</button>
      <button>Write a review</button>
      <Reviews />
    </div>
  );
};

export default Product;
