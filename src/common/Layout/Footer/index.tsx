import { ReactComponent as BrandSlogan } from "@assets/brand/brand-slogan.svg";
import FooterMenu from "./FooterMenu";

const Footer = () => {
  return (
    <footer className="bg-[#13193F] text-white ">
      <FooterMenu />
      <BrandSlogan className="w-[50%] xs:w-[30%] md:w-[10%] h-auto mx-auto my-2" />
      <div className="flex flex-col max-w-xs mx-auto text-center pb-4">
        <p>Cookies Notice</p>
        <p>Privacy Notice</p>
        <p>© {new Date().getFullYear()}, electrozon.com</p>
      </div>
    </footer>
  );
};

export default Footer;
