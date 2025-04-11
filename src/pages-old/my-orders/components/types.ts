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

export interface ProductCardProps {
  productName: string;
  thumbnail: string;
}

export interface OrderItemCardProps {
  id: string;
  productName: string;
  thumbnail: string;
  subcategory: string;
  category: string;
}

export interface Product {
  productId: string;
  productName: string;
  thumbnail: string;
  subcategory: string;
  category: string;
}
