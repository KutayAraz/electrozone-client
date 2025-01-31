import { Product } from "./product";

export interface OrderDetailsCardProps {
  orderId: number;
  orderTotal: number;
  orderDate: string;
  user: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
  };
  orderItems: OrderItemCardProps[];
  isCancellable: boolean;
}

export interface OrderCardProps {
  orderId: number;
  orderTotal: number;
  orderQuantity: number;
  orderDate: string;
  user: {
    firstName: string;
    lastName: string;
  };
  orderItems: Product[];
}

export interface OrderItemCardProps {
  id: string;
  productName: string;
  thumbnail: string;
  subcategory: string;
  category: string;
}

export interface OrderDetailsItemCardProps {
  id: number;
  productName: string;
  thumbnail: string;
  quantity: number;
  price: number;
  brand: string;
  subcategory: string;
  category: string;
}
