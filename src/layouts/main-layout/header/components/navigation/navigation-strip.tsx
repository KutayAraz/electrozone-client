import { Link } from "react-router-dom";

import { paths } from "@/config/paths";
import { MENU_ITEMS } from "@/layouts/main-layout/header/constants/menu";
import BurgerIcon from "@assets/svgs/burger.svg?react";

interface NavigationStripProps {
  onMenuClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const NavigationStrip = ({ onMenuClick, className, style = {} }: NavigationStripProps) => {
  const navContainerClass =
    "flex bg-theme-blue text-white items-center justify-between overflow-x-auto whitespace-nowrap scroll-snap-type-x-mandatory noScrollbar scroll-smooth px-2 pb-[6px] sm:py-[0px]";
  const navStripElementClass =
    "flex-shrink-0 scroll-snap-align-start mx-2 sm:mx-0 border border-transparent hover:border-1 hover:border-white rounded px-3";

  return (
    <div className={`${navContainerClass} ${className}`} style={style}>
      <button
        className={`hidden shrink-0 items-center rounded border border-transparent hover:border-1 hover:border-white sm:flex`}
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <BurgerIcon width={32} height={32} />
        <p className="my-auto hidden px-2 sm:flex">All</p>
      </button>
      <Link
        to={paths.home.getHref()}
        className="flex rounded border border-transparent px-1 hover:border-1 hover:border-white sm:my-auto sm:hidden"
      >
        Home
      </Link>

      {MENU_ITEMS.map((item, index) => (
        <Link to={item.url} key={index} className={navStripElementClass}>
          {item.name}
        </Link>
      ))}
    </div>
  );
};
