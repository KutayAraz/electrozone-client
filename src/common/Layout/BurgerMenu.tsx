import { uiActions } from "@/setup/slices/ui-slice";
import { useDispatch } from "react-redux";
import { ReactComponent as BurgerIcon } from "@assets/svg/burger.svg";

interface BurgerMenuProps {
  className: string;
  children?: React.ReactNode;
}

const BurgerMenu = ({ className, children }: BurgerMenuProps) => {
  const dispatch = useDispatch();
  const handleSideNav = () => {
    dispatch(uiActions.toggle());
  };
  return (
    <button className={`items-center ${className}`} onClick={handleSideNav}>
      <BurgerIcon width={32} height={32} />
      {children}
    </button>
  );
};

export default BurgerMenu;
