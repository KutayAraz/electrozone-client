import { Outlet } from "react-router-dom";
import Footer from "./Footer/index";
import NavStrip from "./NavStrip";
import Sidebar from "./SideMenu";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <NavStrip />
      <Sidebar user={{ name: "userName", city: "CA" }} />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
