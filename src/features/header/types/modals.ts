export interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSubmit: (location: string) => void;
  city: string | null;
}

export interface MenuModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export interface ProfileModalProps {
  isOpen: boolean;
  isSignedIn: boolean;
  onClose: () => void;
}
