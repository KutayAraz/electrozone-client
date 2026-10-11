import BasketSVG from "@assets/svgs/basket.svg?react";

interface BasketProps {
  itemCount: number;
}

export const Basket = ({ itemCount = 0 }: BasketProps) => {
  return (
    <div className="relative inline-block">
      <BasketSVG className="size-9" />

      {itemCount > 0 && (
        <span
          className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5"
          aria-label={`${itemCount} items in basket`}
        >
          {/* Inset so the ping's 2x scale doesn't overflow the viewport on small screens */}
          <span className="absolute inset-1 inline-flex animate-ping rounded-full bg-red-400 opacity-75" />

          <span className="relative inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-semibold leading-none text-white">
            {itemCount > 99 ? "99+" : itemCount}
          </span>
        </span>
      )}
    </div>
  );
};
