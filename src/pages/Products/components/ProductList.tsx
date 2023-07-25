import { Link } from "react-router-dom";
import { Product, ProductListProps } from "./models";

const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="flex max-w-screen-lg mx-auto">
      {products.map((product: Product) => (
        <div
          className="flex flex-col border-2 border-black rounded-xl max-w-xs"
          key={product.id}
        >
          <Link to={`${product.id}`}>
            <img
              src={product.thumbnail}
              alt={product.productName}
            />
            <p>{product.productName}</p>
            <p>{product.brand}</p>
            <p>{product.avgRating}</p>
            <p>$ {product.price}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
