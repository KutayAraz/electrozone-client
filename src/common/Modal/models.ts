export interface BackdropProps {
  onClose: () => void;
}

export interface ModalOverlayProps {
  children: React.ReactNode;
  isOpen: boolean;
  width: string;
  height: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  direction: string;
  transitionDuration: number;
  transitionType: string;
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
  width: string;
  height: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  direction: "top" | "bottom" | "left" | "right";
  autoCloseDuration?: number;
  transitionDuration?: number;
  transitionType: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
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
