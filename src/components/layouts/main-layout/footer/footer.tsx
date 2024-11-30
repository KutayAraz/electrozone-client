import { ReactComponent as BrandSlogan } from "@assets/brand-images/brand-slogan.svg";
import FooterMenu from "./footer-menu";

export const Footer = () => {
  return (
    <footer className="bg-theme-blue text-white py-0">
      <FooterMenu />
      <BrandSlogan className="w-44 sm:w-52 h-auto mx-auto mb-2" />
      <div className="max-w-xs mx-auto text-center pb-4">
        <p>© {new Date().getFullYear()}, electrozone.com</p>
      </div>
    </footer>
  );
};
