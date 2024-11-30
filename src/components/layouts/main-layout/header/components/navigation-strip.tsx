import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleMenuDrawer } from "@/stores/slices/ui-slice";
import { ReactComponent as BurgerIcon } from "@assets/svgs/burger.svg";

export const NavigationStrip = ({ className, style = {} }: { className?: string, style?: React.CSSProperties }) => {
  const dispatch = useDispatch()
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
        className={`items-center border border-transparent hover:border-1 hover:border-white rounded flex-shrink-0 hidden sm:flex scroll-snap-align-start`}
        onClick={() => {
          dispatch(toggleMenuDrawer(true));
        }}
      >
        <BurgerIcon width={32} height={32} />
        <p className="hidden sm:flex my-auto px-2">All</p>
      </button>
      <Link to={"/"} className="flex sm:hidden sm:my-auto border border-transparent hover:border-1 hover:border-white rounded px-1">Home</Link>

      {menuItems.map((item, index) => (
        <Link to={item.url} key={index} className={navStripElementClass}>
          {item.name}
        </Link>
      ))}
    </div>
  );
};
