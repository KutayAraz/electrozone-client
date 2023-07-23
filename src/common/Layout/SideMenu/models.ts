export interface BackdropProps {
  onClose: () => void;
}

export interface ModalOverlayProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export interface State {
  ui: {
    isSideNavOpen: boolean;
  };
}

export interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export interface User {
  name?: string;
  city: string;
}

export interface SidebarProps {
  user?: User;
}
