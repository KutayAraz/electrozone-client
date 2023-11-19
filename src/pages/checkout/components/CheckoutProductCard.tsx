import { Divider } from "@mui/material";

const CheckoutProductCard = ({
  id,
  productName,
  thumbnail,
  brand,
  quantity,
  price,
}: CheckoutProductCardProps) => {
  return (
    <div
      className="bg-white p-4 rounded-md shadow-md flex items-center space-x-4"
      key={id}
    >
      <div className="w-2/5 sm:w-1/5">
        <img
          src={thumbnail}
          alt={`image for ${productName}`}
          className="w-full h-auto object-contain rounded-md"
        />
      </div>
      <Divider orientation="vertical" flexItem/>
      <div className="flex-1">      
        <p className="font-[500]">{productName}</p>
        <p className="text-gray-700">{brand}</p>
        <p className="mt-2">{quantity}</p>
        <p className="text-theme-blue font-semibold">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CheckoutProductCard;
