import { Link } from "react-router-dom";

const ProductCard = ({
  id,
  productName,
  thumbnail,
  subcategory,
  category,
}: ProductCard) => {
  return (
    <Link
      to={`/${category}/${subcategory}/${id}`}
      className="flex flex-col bg-white items-center max-w-screen-sm p-2 hover:underline border-2 rounded-md shadow-sm"
      key={id}
    >
      <div className="w-32 h-32 overflow-hidden rounded-md">
        <img
          src={thumbnail}
          alt={`Image for ${productName}`}
          className="w-full h-full object-contain object-center"
        />
      </div>
      <p className="mt-2 text-center text-sm line-clamp-4">
        {productName}
      </p>
    </Link>
  );
};



export default ProductCard;

// const ProductCard = ({
//   id,
//   productName,
//   thumbnail,
//   subcategory,
//   category,
// }: ProductCard) => {
//   return (
//     <Link
//       to={`/${category}/${subcategory}/${id}`}
//       className="flex flex-col max-w-screen-sm"
//       key={id}
//     >
//       <img src={thumbnail} alt={`Image for ${productName}`} className=""/>
//       <p>{productName}</p>
//     </Link>
//   );
// };

// export default ProductCard;
