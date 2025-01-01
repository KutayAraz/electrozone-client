import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

import { ReactComponent as BackArrow } from "@assets/svgs/go-back.svg";

type SubMenuProps = {
  isVisible: boolean;
  title: string;
  links: Array<{ name: string; url: string }>;
  onBack: () => void;
};

export const SubMenu = ({ isVisible, links, onBack }: SubMenuProps) => (
  <div
    className={`absolute top-0 flex size-full flex-col transition-transform duration-300 ease-in-out
              ${isVisible ? "" : "translate-x-full overflow-hidden"}`}
  >
    <button
      onClick={onBack}
      className="mr-auto flex w-full items-center p-4 text-xl font-bold hover:bg-gray-100"
    >
      <BackArrow className="mr-2 size-6" />
      Main Menu
    </button>
    <Divider />
    {links.map((link) => (
      <Link key={link.url} to={link.url} className="p-4 text-lg hover:bg-gray-100">
        {link.name}
      </Link>
    ))}
  </div>
);
