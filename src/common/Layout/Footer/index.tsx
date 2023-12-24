import { ReactComponent as BrandSlogan } from "@assets/brand/brand-slogan.svg";
import FooterMenu from "./FooterMenu";

const Footer = () => {
  return (
    <footer className="bg-[#13193F] text-white">
      <FooterMenu />
      <BrandSlogan className="w-52 h-auto mx-auto mb-2" />
      <div className="flex flex-col max-w-xs mx-auto text-center pb-4">
        <p className="pb-8 sm:pb-0">© {new Date().getFullYear()}, electrozone.com</p>
      </div>
    </footer>
  );
};

export default Footer;
