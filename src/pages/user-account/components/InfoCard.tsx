import { Link } from "react-router-dom";
import { InfoCardProps } from "./models";

const InfoCard = ({ to, children, Icon }: InfoCardProps) => {
  return (
    <Link
      to={to}
      className="flex items-center p-4 border border-gray-300 rounded-md hover:shadow-lg min-w-[45%] transition-all"
    >
      <span className="text-lg font-medium">{children}</span>
      <Icon className="w-16 h-auto ml-auto" />
    </Link>
  );
};

export default InfoCard;
