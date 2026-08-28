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
  return (
    <div className="m-2 flex flex-col items-center text-center">
      {FOOTER_LINKS.map((link) => (
        <Link key={link.path} to={link.path} className="hover:underline focus:underline">
          {link.label}
        </Link>
      ))}
    </div>
  );
});

FooterMenu.displayName = "FooterMenu";
