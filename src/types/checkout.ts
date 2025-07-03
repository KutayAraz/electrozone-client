export enum CheckoutType {
  NORMAL = "normal",
  SESSION = "session",
  BUY_NOW = "buyNow",
}

export type CheckoutItem = {
  id: number;
  productName: string;
  brand: string;
  thumbnail: string;
  quantity: number;
  price: number;
};
