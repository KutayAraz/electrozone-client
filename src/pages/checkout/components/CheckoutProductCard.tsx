import { Divider } from "@mui/material";

const CheckoutProductCard = ({
  id,
  productName,
  thumbnail,
  quantity,
  price,
}: CheckoutProductCardProps) => {
  return (
    <div
      className="bg-white p-2 rounded-md shadow-md flex items-center space-x-4 w-full max-w-screen-md "
      key={id}
    >
      <div className="max-w-[30%] min-w-[100px] md:max-w-[200px] flex-grow">
        <img
          src={thumbnail}
          alt={`image for ${productName}`}
          className="w-auto h-32 object-contain mx-auto"
        />
      </div>
      <Divider orientation="vertical" flexItem />
      <div className="flex flex-col justify-around h-full space-y-2">
        <p>{productName}</p>
        <p>Quantity: {quantity}</p>
        <p>${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CheckoutProductCard;
