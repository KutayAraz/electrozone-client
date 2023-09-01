interface CartItemCardProps {
  id: number;
  productName: string;
  thumbnail: string;
  quantity: number;
  price: number;
  totalPrice: number;
  onRemoveItem: () => void;
  onQuantityChange: () => void;
}
