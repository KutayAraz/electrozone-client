import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { toggleMenuDrawer } from "@/stores/slices/ui-slice";
import { ReactComponent as BurgerIcon } from "@assets/svgs/burger.svg";

type NavigationStripProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const NavigationStrip = ({ className, style = {} }: NavigationStripProps) => {
  const dispatch = useDispatch();
  const navContainerClass =
    "flex bg-theme-blue text-white items-center justify-between overflow-x-auto whitespace-nowrap scroll-snap-type-x-mandatory noScrollbar scroll-smooth px-2 pb-[6px] sm:py-[0px]";
  const navStripElementClass =
    "flex-shrink-0 scroll-snap-align-start mx-2 sm:mx-0 border border-transparent hover:border-1 hover:border-white rounded px-3";

  const menuItems = [
    { name: "Best Sellers", url: "/trending/best-sellers" },
    { name: "TVs", url: "/category/tvs-and-soundbars/tvs" },
    { name: "Most Wishlisted", url: "/trending/most-wishlisted" },
    { name: "Laptops", url: "/category/computers-and-accessories/laptops" },
    { name: "Top Rated", url: "/trending/top-rated" },
    { name: "Smartphones", url: "/category/smartphones-and-accessories/smartphones" },
    { name: "Laser Printers", url: "/category/printers-and-ink/laser-printers" },
    { name: "PCs", url: "/category/computers-and-accessories/computers" },
  ];

  return (
    <div className={`${navContainerClass} ${className}`} style={style}>
      <button
        className={`hidden shrink-0 items-center rounded border border-transparent hover:border-1 hover:border-white sm:flex`}
        onClick={() => {
          dispatch(toggleMenuDrawer(true));
        }}
      >
        <BurgerIcon width={32} height={32} />
        <p className="my-auto hidden px-2 sm:flex">All</p>
      </button>
      <Link
        to={"/"}
        className="flex rounded border border-transparent px-1 hover:border-1 hover:border-white sm:my-auto sm:hidden"
      >
        Home
      </Link>

      {menuItems.map((item, index) => (
        <Link to={item.url} key={index} className={navStripElementClass}>
          {item.name}
        </Link>
      ))}
    </div>
  );
};
