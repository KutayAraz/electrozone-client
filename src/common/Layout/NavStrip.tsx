import BurgerMenu from "./BurgerMenu";

const NavStrip = () => {
  return (
    <div className="flex bg-[#13193F] text-white justify-between flex-grow px-2 flex-nowrap">
      <BurgerMenu className="hidden xs:flex">
        <p>All</p>
      </BurgerMenu>
      <p>Best Sellers</p>
      <p>Today's Deals</p>
      <p>Most Wishlisted</p>
      <p>Computers</p>
      <p>Printers</p>
    </div>
  );
};

export default NavStrip;
