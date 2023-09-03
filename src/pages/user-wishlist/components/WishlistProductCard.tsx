import { Link } from "react-router-dom";

export interface WishlistProductCardProps {
  id: number;
  productName: string;
  brand: string;
  thumbnail: string;
  price: number;
  stock: number;
  subcategory: string;
  category: string;
  onRemoveFromWishlist: (id: number) => void;
}

const WishlistProductCard = ({
  id,
  productName,
  brand,
  thumbnail,
  price,
  stock,
  subcategory,
  category,
  onRemoveFromWishlist,
}: WishlistProductCardProps) => {

  return (
    <>
      <Link to={`/${category}/${subcategory}/${id}`}>
        <p>{productName}</p>
        <p>{brand}</p>
        <img src={thumbnail} alt={`thumbnail image for ${productName}`} />
      </Link>
      <p>{price}</p>
      {stock < 1 ? <p>Product out of stock</p> : ""}
      <button onClick={() => onRemoveFromWishlist(id)}>
        Remove from wishlist
      </button>
    </>
  );
};

export default WishlistProductCard;
