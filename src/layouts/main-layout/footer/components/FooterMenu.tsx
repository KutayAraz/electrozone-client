import { memo } from "react";
import { Link } from "react-router-dom";

import { paths } from "@/config/paths";

interface FooterLink {
  path: string;
  label: string;
}

const FOOTER_LINKS: FooterLink[] = [
  { path: paths.misc.projectDetails.getHref(), label: "About the Project" },
  { path: paths.misc.contact.getHref(), label: "Contact" },
];

export const FooterMenu = memo(() => {
  const elementClasses = "hover:underline block focus:underline";

  return (
    <div className="m-2 flex items-center justify-center text-center">
      <div>
        {FOOTER_LINKS.map((link) => (
          <Link key={link.path} to={link.path} className={elementClasses}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
});

FooterMenu.displayName = "FooterMenu";
