interface NavigationLink {
  path: string;
  label: string;
}

export const navigationLinks: NavigationLink[] = [
  { path: "/account/orders", label: "Previous Orders" },
  { path: "/account/profile", label: "Manage Profile" },
  { path: "/account/update-password", label: "Account Security" },
  { path: "/account/wishlist", label: "Wishlist" },
  { path: "/contact", label: "Contact Us" },
];
