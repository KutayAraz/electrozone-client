import { memo } from "react";

import BrandSlogan from "@assets/brand-images/brand-slogan.svg?react";

import { FooterMenu } from "./components/footer-menu";

export const Footer = memo(() => {
  return (
    <footer className="bg-theme-blue py-0 text-white">
      <FooterMenu />
      <BrandSlogan className="mx-auto mb-2 h-auto w-44 sm:w-52" />
      <div className="mx-auto max-w-xs pb-4 text-center">
        <p>© {new Date().getFullYear()}, electrozone.com</p>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";
