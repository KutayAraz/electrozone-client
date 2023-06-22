import { Product } from "@Product/models";

const Product = ({
  product: { name, brand, images, description, avgRating, price, stock },
}: Product) => {
  return (
    <div className="flex">
      {images.map((image) => (
        <img key={image.alt} src={image.img} alt={`${image.alt}`} />
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
    </div>
  );
};

export default Product;
