import { Link } from "react-router-dom";

const FooterMenu = () => {
  const elementClasses =
    "underline hover:underline block mb-1 focus:text-gray-700 my-1";

  return (
    <div className="flex justify-center items-center text-center mx-3 pt-4 xs:p-4 my xs:space-x-4 ">
      <div>
        <Link to="" className={elementClasses}>
          Deals
        </Link>
        <Link to="/contact" className={elementClasses}>
          Most Wishlisted Items
        </Link>
        <Link to="" className={elementClasses}>
          Returns & Replacements
        </Link>
      </div>
      <div>
        <Link to="" className={elementClasses}>
          Frequently Asked Questions
        </Link>
        <Link to="" className={elementClasses}>
          About Us
        </Link>
        <Link to="/contact" className={elementClasses}>
          Contact
        </Link>
      </div>
    </div>
  );
};

export default FooterMenu;
