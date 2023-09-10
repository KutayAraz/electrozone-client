interface CartItemCardProps {
  id: number;
  productName: string;
  thumbnail: string;
  quantity: number;
  price: number;
  totalPrice: number;
  category: string;
  subcategory: string;
  onRemoveItem: () => void;
  onQuantityChange: () => void;
}
