export interface FooterLink {
  to: string;
  label: string;
}

export const FOOTER_LINKS: FooterLink[] = [
  { to: "/project-details", label: "About the Project" },
  { to: "/contact", label: "Contact" },
];
