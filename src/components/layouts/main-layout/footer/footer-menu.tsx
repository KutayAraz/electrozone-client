import { Link } from "react-router-dom";

export const FooterMenu = () => {
  const elementClasses = "hover:underline block focus:underline";

  return (
    <div className="m-2 flex items-center justify-center text-center">
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
