import { ProductProps } from "../../models";

const Product = ({ product }: ProductProps) => {
  return (
    <div className="flex max-w-screen-xs mx-auto flex-col">
      <p>product id: {product.id}</p>
      <img src={product.thumbnail} alt="" />
      <h2>{product.productName}</h2>
      <p>{product.brand}</p>
      <p>{product.averageRating}</p>
      <p>{product.description}</p>
      <p>{product.price}</p>
      {product.stock > 0 ? (
        <div className="flex flex-col">
          <button>Add to basket</button>
          <button>Buy now</button>
        </div>
      ) : (
        <p>This product is currently out of stock</p>
      )}
      <button>Add to Wishlist</button>
      <button>Write a review</button>
      {/* <Reviews /> */}
    </div>
  );
};

export default Product;
