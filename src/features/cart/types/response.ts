import { ErrorType } from "@/types/api-error";

export interface FormattedCartItem {
  cartItemId: number;
  quantity: number;
  amount: string;
  id: number;
  productName: string;
  avgRating: string;
  thumbnail: string;
  price: string;
  subcategory: string;
  category: string;
}

export interface PriceChange {
  productName: string;
  oldPrice: string;
  newPrice: string;
}

export interface QuantityChange {
  productName: string;
  oldQuantity: number;
  newQuantity: number;
  reason: ErrorType.QUANTITY_LIMIT_EXCEEDED | ErrorType.STOCK_LIMIT_EXCEEDED;
}

export interface CartResponse {
  cartTotal: string;
  totalQuantity: number;
  cartItems: FormattedCartItem[];
  removedCartItems?: string[];
  priceChanges?: PriceChange[];
  quantityChanges?: QuantityChange[];
}

export interface CartOperationResponse {
  success: boolean;
  priceChanges?: PriceChange[];
  quantityChanges?: QuantityChange[];
  removedCartItems?: string[];
}

export interface AddToCartPayload {
  productId: number;
  quantity: number;
}

export type AddToSessionCartPayload = AddToCartPayload;
export type BuyNowCartPayload = AddToCartPayload;
