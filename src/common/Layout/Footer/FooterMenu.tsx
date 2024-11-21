import { Link } from "react-router-dom";

const FooterMenu = () => {
  const elementClasses =
    "hover:underline block focus:underline";

  return (
    <div className="flex justify-center items-center text-center m-2">
      <div>
        <Link to="/project-details" className={elementClasses}>
          About the Project
        </Link>
        <Link to="/contact" className={elementClasses}>
          Contact
        </Link>
      </div>
    </div>
  );
};

export default FooterMenu;
