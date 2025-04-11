import { Link } from "react-router-dom";

type InfoCardProps = {
  to: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
};

export const InfoCard = ({ to, children, Icon }: InfoCardProps) => {
  return (
    <Link
      to={to}
      className="flex grow items-center rounded-md border border-gray-300 p-4 text-theme-blue transition-all hover:bg-gray-100 hover:shadow-lg"
    >
      <span className="text-lg">{children}</span>
      <Icon className="ml-auto size-16" />
    </Link>
  );
};
