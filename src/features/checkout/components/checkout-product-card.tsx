interface CheckoutItemCardProps {
  id: number;
  productName: string;
  brand: string;
  thumbnail: string;
  quantity: number;
  price: number;
}

export const CheckoutItemCard = ({
  id,
  productName,
  brand,
  thumbnail,
  quantity,
  price,
}: CheckoutItemCardProps) => {
  const totalPrice = price * quantity;

  return (
    <div
      className="flex w-full max-w-screen-md items-center rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
      key={id}
    >
      <div className="relative min-w-[80px] max-w-[120px]">
        <div className="aspect-square overflow-hidden rounded-md bg-gray-50 p-2">
          <img
            src={thumbnail}
            alt={productName}
            className="h-full w-full object-contain mix-blend-multiply"
          />
        </div>

        {quantity > 1 && (
          <div className="absolute -right-3 -top-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
            {quantity}
          </div>
        )}
      </div>

      <div className="ml-4 flex flex-1 flex-col space-y-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-medium leading-tight text-gray-800">{productName}</h3>
            <p className="text-sm text-gray-500">{brand}</p>
          </div>
          <span className="whitespace-nowrap font-semibold text-gray-900">
            ${totalPrice.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center text-sm text-gray-600">
            <span>Qty: {quantity}</span>
            {quantity > 1 && (
              <span className="ml-2 text-xs text-gray-500">(${price.toFixed(2)} each)</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
