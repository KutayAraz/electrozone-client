import { Divider } from "@mui/material";

interface CheckoutProductCardProps {
  id: number;
  productName: string;
  brand: string;
  thumbnail: string;
  quantity: number;
  price: number;
}

export const CheckoutProductCard = ({
  id,
  productName,
  thumbnail,
  quantity,
  price,
}: CheckoutProductCardProps) => {
  return (
    <div
      className="flex w-full max-w-screen-md items-center space-x-4 rounded-md bg-white p-2 shadow-md "
      key={id}
    >
      <div className="min-w-[100px] max-w-[30%] grow md:max-w-[200px]">
        <img src={thumbnail} alt={productName} className="mx-auto h-32 w-auto object-contain" />
      </div>
      <Divider orientation="vertical" flexItem />
      <div className="flex h-full flex-col justify-around space-y-2">
        <p>{productName}</p>
        <p>Quantity: {quantity}</p>
        <p>${price}</p>
      </div>
    </div>
  );
};
