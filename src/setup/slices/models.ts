export interface UserState {
  user: {
    userId: number | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    address: string | null;
    city: string | null;
  };
  isSignedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface UIState {
  isSideNavOpen: boolean;
  isTVSectionOpen: boolean;
  isPCsSectionOpen: boolean;
  isPrintersSectionOpen: boolean;
  isPhonesSectionOpen: boolean;
}

export interface CartItem {
  id: string;
  name: string;
  thumbnail: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  changed: boolean;
}
