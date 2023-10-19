import { Link } from "react-router-dom";
import { InfoCardProps } from "./models";

const InfoCard = ({ to, children, Icon }: InfoCardProps) => {
  return (
    <Link
      to={to}
      className="flex items-center px-[1%] py-4 border border-gray-300 rounded-md hover:shadow-lg transition-all flex-1/2 flex-grow text-theme-blue"
    >
      <span className="text-lg font-medium">{children}</span>
      <Icon className="w-16 h-16 ml-auto" />
    </Link>
  );
};

export default InfoCard;
