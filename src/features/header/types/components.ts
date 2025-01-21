export interface LocationSectionProps {
  city: string | null;
  isSignedIn: boolean;
  onLocationClick: () => void;
}

export interface MobileLocationSectionProps {
  onLocationClick: () => void;
}

interface MenuSection {
  id: string;
  title: string;
  links: Array<{ name: string; url: string }>;
}

export interface MenuSectionProps {
  section: MenuSection;
  onClick: () => void;
}

export interface SubMenuProps {
  isVisible: boolean;
  title: string;
  links: Array<{ name: string; url: string }>;
  onBack: () => void;
}

export interface UserHeaderProps {
  firstName: string | null;
  isSignedIn: boolean;
}

export interface NavigationStripProps {
  onMenuClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface SearchBarProps {
  className?: string;
  placeholder?: string;
  style?: React.CSSProperties;
}

export interface SearchControlsProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface UserSectionProps {
  firstName: string | null;
  isSignedIn: boolean;
  itemCount: number;
  smallScreenDevice: boolean;
  onProfileClick: () => void;
  onSignInClick: () => void;
}
