export interface OrderCardProps {
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

export interface OrderItemCardProps {
  id: number;
  productName: string;
  thumbnail: string;
  quantity: number;
  price: number;
  brand: string;
  subcategory: string;
  category: string;
}
