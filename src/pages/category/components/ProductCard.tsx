import { Link } from "react-router-dom";
import { CategoryProductProps } from "./models.ts";
import { Divider, Rating } from "@mui/material";

const ProductCard = ({
  subcategoryName,
  id,
  thumbnail,
  productName,
  brand,
  averageRating,
  price,
}: CategoryProductProps) => {
  return (
    <div className="w-full xs:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 px-2 text-center items-center mb-2">
      <Link
        to={`${subcategoryName + "/" + id}`}
        className="border-1 border-gray-300 rounded-md shadow-md hover:bg-gray-100 h-full px-2 xs:px-4 py-2 xs:pt-4 pb-2 flex xs:flex-col xs:justify-between"
      >
        <div className="flex-1 px-2 xs:px-0">
          <img
            src={thumbnail}
            alt={`image for ${productName}`}
            className="w-56 h-56 xs:h-auto object-contain mx-auto"
          />
        </div>
        <Divider
          orientation="vertical"
          className="self-stretch xs:hidden mx-2"
        />
        <Divider className="self-stretch hidden xs:block" />
        <div className="xs:mt-2 flex-1 flex flex-col px-2 xs:px-0 my-auto space-y-2">
          <p>{productName}</p>
          <p className="font-[500]">{brand}</p>
          <Rating
            name="half-rating-read"
            value={parseFloat(averageRating)}
            precision={0.1}
            readOnly
            className="mx-auto"
          />
          <p>$ {price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
