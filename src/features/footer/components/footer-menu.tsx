import { memo } from "react";
import { Link } from "react-router-dom";

import { FOOTER_LINKS } from "../constants/links";

export const FooterMenu = memo(() => {
  // Extract classes to a constant to avoid recreation on each render
  const elementClasses = "hover:underline block focus:underline";

  return (
    <div className="m-2 flex items-center justify-center text-center">
      <div>
        {FOOTER_LINKS.map((link) => (
          <Link key={link.to} to={link.to} className={elementClasses}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
});

FooterMenu.displayName = "FooterMenu";
