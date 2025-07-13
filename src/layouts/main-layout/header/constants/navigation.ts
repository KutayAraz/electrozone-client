import { paths } from "@/config/paths";

interface NavigationLink {
  path: string;
  label: string;
}

export const navigationLinks: NavigationLink[] = [
  { path: paths.app.profile.orders.getHref(), label: "Previous Orders" },
  { path: paths.app.profile.getHref(), label: "Manage Profile" },
  { path: paths.app.security.getHref(), label: "Account Security" },
  { path: paths.app.wishlist.getHref(), label: "Wishlist" },
  { path: paths.misc.contact.getHref(), label: "Contact Us" },
];
