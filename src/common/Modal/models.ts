export interface BackdropProps {
  onClose: () => void;
}

export interface ModalOverlayProps {
  children: React.ReactNode;
  isOpen: boolean;
  widthClass: string;
  heightClass: string;
  topClass?: string;
  bottomClass?: string;
  leftClass?: string;
  rightClass?: string;
  direction: string;
  transitionDuration: number;
  transitionType: string;
  className?: string;
}

export interface State {
  ui: {
    isSideNavOpen: boolean;
  };
}

export interface User {
  name?: string;
  city: string;
}

export interface SidebarProps {
  user?: User;
}

export interface CustomizableModalProps {
  widthClass: string;
  heightClass: string;
  topClass?: string;
  bottomClass?: string;
  leftClass?: string;
  rightClass?: string;
  direction: "top" | "bottom" | "left" | "right" | "center";
  autoCloseDuration?: number;
  transitionDuration?: number;
  transitionType: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export type ModalStyleType = {
  width: string;
  height: string;
  transitionDuration?: string;
  top?: string;
  bottom?: string;
  right?: string;
  left?: string;
  transform?: string;
};
