import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

type TrendingProductCardProps = {
  id: number;
  productName: string;
  brand: string;
  thumbnail: string;
  price: number;
  averageRating: string;
  subcategory: string;
  category: string;
};

export const TrendingProductCard = ({
  subcategory,
  id,
  thumbnail,
  productName,
  averageRating,
  price,
  category,
}: TrendingProductCardProps) => {
  return (
    <div className="mb-2 w-1/2 items-center px-2 text-center sm:w-1/3 md:w-1/4 ">
      <Link
        to={`/category/${category}/${subcategory + "/" + id}`}
        className="flex h-full flex-col rounded-md border-1 border-gray-300 px-4 pb-2 pt-4 shadow-md hover:bg-gray-100 "
      >
        <div>
          <img src={thumbnail} alt={productName} className="mx-auto size-56 object-contain" />
        </div>
        <div>
          <Rating
            name="half-rating-read"
            value={parseFloat(averageRating)}
            precision={0.1}
            readOnly
          />
          <p>{productName}</p>
          <p>$ {price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};
