import { Divider } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { CustomModal } from "@/components/ui/custom-modal";
import { paths } from "@/config/paths";
import { selectUser } from "@/stores/slices/user-slice";
import CloseButton from "@assets/svgs/close-button.svg?react";
import ExitIcon from "@assets/svgs/exit.svg?react";

import { MENU_SECTIONS, TRENDING_LINKS } from "../../../constants/menu";

import { MenuSection } from "./menu-section";
import { SubMenu } from "./sub-menu";
import { UserHeader } from "./user-header";

interface MenuModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const MenuModal = ({ children, isOpen, onClose }: MenuModalProps) => {
  const user = useSelector(selectUser);

  const [activeView, setActiveView] = useState("main");

  const handleClose = () => {
    onClose();
    setTimeout(() => setActiveView("main"), 300);
  };

  return (
    <div className="flex">
      <CustomModal
        widthClass="w-80 xs:w-[432px]"
        heightClass={`${
          activeView === "main" ? "h-full overflow-y-auto" : "min-h-screen h-auto overflow-y-hidden"
        }`}
        topClass="top-0"
        leftClass="left-0"
        direction="right"
        transitionType="slide"
        transitionDuration={300}
        isOpen={isOpen}
        onClose={handleClose}
        className="overflow-x-hidden"
        ariaLabel="Main Menu Modal"
      >
        <UserHeader firstName={user.firstName} isSignedIn={user.isAuthenticated} />

        <div className="relative flex h-fit flex-col justify-between text-gray-700">
          <div
            className={`transition-transform duration-300 ease-in-out 
             ${activeView !== "main" ? "-translate-x-full" : ""}`}
          >
            <div className="flex flex-col">
              <h2 className="p-4 text-xl font-bold">Trending</h2>
              <Divider />
              {TRENDING_LINKS.map((link) => (
                <Link key={link.url} to={link.url} className="px-4 py-3 text-lg hover:bg-gray-100">
                  {link.name}
                </Link>
              ))}
            </div>

            <Divider />
            <div className="p-4">
              <h2 className="text-xl font-bold">Shop By Department</h2>
            </div>
            <Divider />

            {MENU_SECTIONS.map((section) => (
              <MenuSection
                key={section.id}
                section={section}
                onClick={() => setActiveView(section.id)}
              />
            ))}

            <Divider />
            <div className="flex flex-col">
              <h2 className="p-4 text-xl font-bold">Help & Settings</h2>
              <Divider />
              {user.isAuthenticated && (
                <Link to={paths.app.root.getHref()} className="p-4 text-lg hover:bg-gray-100">
                  Your Account
                </Link>
              )}
              {user.city && <p className="p-4 text-lg">Delivery Location: {user.city}</p>}
              <Link to={paths.misc.contact.getHref()} className="p-4 text-lg hover:bg-gray-100">
                Contact
              </Link>
              <Link
                to={user.isAuthenticated ? "/sign-out" : "/sign-in"}
                className="p-4 text-lg hover:bg-gray-100"
              >
                {user.isAuthenticated ? "Sign Out " : "Sign In"}
                {user.isAuthenticated && <ExitIcon className="mr-4 inline size-6" />}
              </Link>
            </div>
          </div>

          {MENU_SECTIONS.map((section) => (
            <SubMenu
              key={section.id}
              isVisible={activeView === section.id}
              title={section.title}
              links={section.links}
              onBack={() => setActiveView("main")}
            />
          ))}
        </div>
      </CustomModal>
      {isOpen && (
        <button
          className="absolute left-[340px] top-4 z-40 size-7 xs:left-[452px]"
          onClick={handleClose}
        >
          <CloseButton width={32} height={32} className="text-red-500" />
        </button>
      )}
      {children}
    </div>
  );
};
