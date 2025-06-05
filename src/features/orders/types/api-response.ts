interface OrderUser {
  firstName: string;
  lastName: string;
}

export interface OrderItem {
  productId: number;
  productName: string;
  thumbnail: string;
  subcategory: string;
  category: string;
}

export interface Order {
  orderId: number;
  orderTotal: string;
  orderDate: string;
  orderQuantity: number;
  user: OrderUser;
  orderItems: OrderItem[];
}

interface OrderUserDetails {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
}

/**
 * Represents a detailed order item with product information
 * Includes quantity, pricing, and product categorization
 */
interface DetailedOrderItem {
  id: number;
  quantity: number;
  price: string; // Decimal string for precise monetary values
  productName: string;
  brand: string;
  thumbnail: string;
  category: string;
  subcategory: string;
}

/**
 * Represents a detailed order view
 * Used for single order display with complete information
 */
export interface DetailedOrder {
  id: number;
  user: OrderUserDetails;
  orderTotal: string; // Decimal string for precise monetary values
  orderDate: string; // ISO 8601 date string
  orderItems: DetailedOrderItem[];
  isCancellable: boolean;
}

// Error types for validation
export enum ErrorType {
  // Cart item validation errors
  QUANTITY_LIMIT_EXCEEDED = "QUANTITY_LIMIT_EXCEEDED",
  STOCK_LIMIT_EXCEEDED = "STOCK_LIMIT_EXCEEDED",
  PRICE_CHANGED = "PRICE_CHANGED",

  // Checkout session errors
  NO_CHECKOUT_SESSION = "NO_CHECKOUT_SESSION",
  CHECKOUT_SESSION_EXPIRED = "CHECKOUT_SESSION_EXPIRED",

  // Order processing errors
  EMPTY_CART = "EMPTY_CART",
  INVALID_CHECKOUT_TYPE = "INVALID_CHECKOUT_TYPE",
  ACCESS_DENIED = "ACCESS_DENIED",

  // Order cancellation errors
  ORDER_NOT_FOUND = "ORDER_NOT_FOUND",
  UNAUTHORIZED_ORDER_CANCELLATION = "UNAUTHORIZED_ORDER_CANCELLATION",
  CANCELLATION_PERIOD_ENDED = "CANCELLATION_PERIOD_ENDED",
}

// Cart response types
export interface CartResponse {
  cartTotal: string;
  totalQuantity: number;
  cartItems: FormattedCartItem[];
  removedCartItems?: string[];
  priceChanges?: PriceChange[];
  quantityChanges?: QuantityChange[];
}

export interface FormattedCartItem {
  id: number;
  productName: string;
  brand: string;
  thumbnail: string;
  price: string;
  quantity: number;
  category?: string;
  subcategory?: string;
}

export interface QuantityChange {
  productName: string;
  oldQuantity: number;
  newQuantity: number;
  reason: ErrorType.QUANTITY_LIMIT_EXCEEDED | ErrorType.STOCK_LIMIT_EXCEEDED;
}

export interface PriceChange {
  productName: string;
  oldPrice: string;
  newPrice: string;
}

// Checkout snapshot data type
export interface CheckoutData {
  checkoutSnapshotId: string;
  cartData: CartResponse;
}

// Order response type
export interface OrderResponse {
  orderId: number;
}
