import { ProductCardProps } from "../models";

const ProductCard = ({ image, name, avgRating, price }: ProductCardProps) => {
  return (
    <div className="flex flex-col">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>{avgRating}</p>
      <h3>{price}</h3>
      <button>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
