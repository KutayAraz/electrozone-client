import { Link } from "react-router-dom";
import BurgerMenu from "./BurgerMenu";

const NavStrip = () => {
  const navContainerClass =
    "flex bg-[#13193F] text-white items-center justify-between overflow-x-auto whitespace-nowrap scroll-snap-type-x-mandatory noScrollbar scroll-smooth py-1 sm:py-[0.5rem]";
  const navStripElementClass =
    "flex-shrink-0 scroll-snap-align-start mr-2 sm:mr-4 border border-transparent hover:border-1 hover:border-white rounded pr-4";

  const menuItems = [
    { name: "Best Sellers", url: "/trending/best-sellers" },
    { name: "TVs", url: "/category/tvs-and-soundbars/tvs"},
    { name: "Most Wishlisted", url: "/trending/most-wishlisted" },
    { name: "Laptops", url: "/category/computers-and-accessories/laptops"},
    { name: "Top Rated", url: "/trending/top-rated" },
    { name: "Smartphones", url: "/category/smartphones-and-accessories/smartphones"},
    { name: "Printers", url: "/category/printers-and-ink/printers"},
  ];

  return (
    <div className={navContainerClass}>
      <BurgerMenu className="flex-shrink-0 hidden md:flex scroll-snap-align-start">
        <p>All</p>
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
