import { ReactComponent as BasketSVG } from "@assets/svg/basket.svg";

const BasketWithBadge = ({ itemCount }: any) => {
  return (
    <div className="relative inline-block">
      <BasketSVG className="w-9 h-9" />
      {itemCount > 0 && (
        <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 text-white text-xs justify-center items-center">
            {itemCount}
          </span>
        </span>
      )}
    </div>
  );
};

export default BasketWithBadge;
