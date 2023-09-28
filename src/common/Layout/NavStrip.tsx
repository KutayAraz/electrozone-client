import BurgerMenu from "./BurgerMenu";

const NavStrip = () => {
  return (
    <div
      className={`flex bg-[#13193F] text-white justify-between px-[3%] overflow-x-auto whitespace-nowrap scroll-snap-type-x-mandatory noScrollbar scroll-smooth py-1`}
    >
      <BurgerMenu className="flex-shrink-0 hidden xs:flex scroll-snap-align-start">
        <p>All</p>
      </BurgerMenu>
      <p className="flex-shrink-0 scroll-snap-align-start pr-4">Best Sellers</p>
      <p className="flex-shrink-0 scroll-snap-align-start pr-4">
        Today's Deals
      </p>
      <p className="flex-shrink-0 scroll-snap-align-start pr-4">
        Most Wishlisted
      </p>
      <p className="flex-shrink-0 scroll-snap-align-start pr-4">Computers</p>
      <p className="flex-shrink-0 scroll-snap-align-start pr-4">Printers</p>
    </div>
  );
};

export default NavStrip;
