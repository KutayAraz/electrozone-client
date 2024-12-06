import { ReactComponent as BrandSlogan } from "@assets/brand-images/brand-slogan.svg";

import { FooterMenu } from "./footer-menu";

export const Footer = () => {
  return (
    <footer className="bg-theme-blue py-0 text-white">
      <FooterMenu />
      <BrandSlogan className="mx-auto mb-2 h-auto w-44 sm:w-52" />
      <div className="mx-auto max-w-xs pb-4 text-center">
        <p>© {new Date().getFullYear()}, electrozone.com</p>
      </div>
    </footer>
  );
};
