export interface User {
  firstName: string | null;
  city: string | null;
  isSignedIn: boolean;
  userIntent: CheckoutIntent;
  cartItemCount: number;
}

export interface UserProtected {
  id: string | null;
  email: string | null;
  lastName: string | null;
  address: string | null;
}

export interface UIState {
  isSideNavOpen: boolean;
  isTVSectionOpen: boolean;
  isPCsSectionOpen: boolean;
  isPrintersSectionOpen: boolean;
  isPhonesSectionOpen: boolean;
}

export interface CartItem {
  id: number;
  quantity: number;
}

export interface LocalCartState {
  items: CartItem[];
  totalQuantity: number;
}

export interface BuyNowCartState {
  productId: number | null;
  quantity: number;
}

export interface WishlistState {
  items: Array<number>;
}

export enum CheckoutIntent {
  NORMAL = "normal",
  SESSION = "session",
  BUY_NOW = "buyNow",
}
