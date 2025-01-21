interface NavigationLink {
  path: string;
  label: string;
}

export const navigationLinks: NavigationLink[] = [
  { path: "/my-account/orders", label: "Previous Orders" },
  { path: "/my-account/profile", label: "Manage Profile" },
  { path: "/my-account/update-password", label: "Account Security" },
  { path: "/my-account/wishlist", label: "Wishlist" },
  { path: "/contact-us", label: "Contact Us" },
];
