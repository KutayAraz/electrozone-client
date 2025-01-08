import { Link } from "react-router-dom";

import { ReactComponent as BurgerIcon } from "@assets/svgs/burger.svg";

type MenuItem = {
  name: string;
  url: string;
};

type NavigationStripProps = {
  onMenuClick: () => void;
  className?: string;
  style?: React.CSSProperties;
};

const MENU_ITEMS: MenuItem[] = [
  { name: "Best Sellers", url: "/trending/best-sellers" },
  { name: "TVs", url: "/category/tvs-and-soundbars/tvs" },
  { name: "Most Wishlisted", url: "/trending/most-wishlisted" },
  { name: "Laptops", url: "/category/computers-and-accessories/laptops" },
  { name: "Top Rated", url: "/trending/top-rated" },
  { name: "Smartphones", url: "/category/smartphones-and-accessories/smartphones" },
  { name: "Laser Printers", url: "/category/printers-and-ink/laser-printers" },
  { name: "PCs", url: "/category/computers-and-accessories/computers" },
];

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
        to={"/"}
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
