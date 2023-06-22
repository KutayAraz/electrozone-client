import { Outlet } from "react-router-dom";
import Footer from "./Footer/index";
import NavStrip from "./NavStrip";
import Sidebar from "./SideMenu";
import Header from "./Header";

const Layout = () => {
  return (
    <>
      <Header />
      <NavStrip />
      <Sidebar user={{ name: "userName", city: "CA" }} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
