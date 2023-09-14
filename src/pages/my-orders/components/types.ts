export interface OrderCardProps {
  orderId: number;
  orderTotal: number;
  orderDate: string;
  orderItems: ProductCardProps[];
}

export interface ProductCardProps {
  productName: string;
  thumbnail: string;
}
