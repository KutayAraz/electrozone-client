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
