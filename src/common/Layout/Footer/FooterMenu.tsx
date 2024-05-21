import { Link } from "react-router-dom";

const FooterMenu = () => {
  const elementClasses =
    "hover:underline block mb-1 focus:text-gray-200 focus:underline";

  return (
    <div className="flex justify-center items-center text-center mx-3 pt-2 xs:p-2 xs:space-x-4">      
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
