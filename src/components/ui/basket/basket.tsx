import { ReactComponent as BasketSVG } from "@assets/svgs/basket.svg";

export const Basket = ({ itemCount }: any) => {
  return (
    <div className="relative inline-block">
      <BasketSVG className="size-9" />
      {itemCount > 0 && (
        <span className="absolute right-0 top-0 -mr-1 -mt-1 flex size-3">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex size-3 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {itemCount}
          </span>
        </span>
      )}
    </div>
  );
};
