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
      className="bg-white p-4 rounded-md shadow-md flex items-center space-x-4 w-full max-w-screen-md "
      key={id}
    >
      <div className="max-w-[20%] min-w-[100px] md:max-w-[200px] flex-grow">
        <img
          src={thumbnail}
          alt={`image for ${productName}`}
          className="w-auto h-32 object-contain mx-auto"
        />
      </div>
      <Divider orientation="vertical" flexItem/>
      <div className="flex-1">      
        <p className="font-[500]">{productName}</p>
        <p className="text-gray-700">{brand}</p>
        <p className="mt-2">Quantity: {quantity}</p>
        <p className="text-theme-blue font-semibold">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CheckoutProductCard;
