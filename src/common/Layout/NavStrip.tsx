import { Link } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";

const NavStrip = () => {
  const navContainerClass =
    "flex bg-theme-blue text-white items-center justify-between overflow-x-auto whitespace-nowrap scroll-snap-type-x-mandatory noScrollbar scroll-smooth py-1 sm:py-[2px] flex-grow";
  const navStripElementClass =
    "flex-shrink-0 scroll-snap-align-start mx-2 sm:mx-0 border border-transparent hover:border-1 hover:border-white rounded px-3";

  const menuItems = [
    { name: "Best Sellers", url: "/trending/best-sellers" },
    { name: "TVs", url: "/category/tvs-and-soundbars/tvs"},
    { name: "Most Wishlisted", url: "/trending/most-wishlisted" },
    { name: "Laptops", url: "/category/computers-and-accessories/laptops"},
    { name: "Top Rated", url: "/trending/top-rated" },
    { name: "Smartphones", url: "/category/smartphones-and-accessories/smartphones"},
    { name: "Laser Printers", url: "/category/printers-and-ink/laser-printers"},
    { name: "PCs", url: "/category/computers-and-accessories/pcs"},
  ];

  return (
    <div className={navContainerClass}>
      <BurgerMenu className="flex-shrink-0 hidden sm:flex scroll-snap-align-start">
        <Link to={"/"} className="flex sm:hidden sm:my-auto border border-transparent hover:border-1 hover:border-white rounded px-1">Home</Link>
      </BurgerMenu>
      {menuItems.map((item, index) => (
        <Link to={item.url} key={index} className={navStripElementClass}>
          {item.name}
        </Link>
      ))}
    </div>
  );
};

export default NavStrip;
