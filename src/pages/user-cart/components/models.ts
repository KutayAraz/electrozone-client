interface CartItemCardProps {
  id: number;
  productName: string;
  thumbnail: string;
  quantity: number;
  price: number;
  amount: number;
  category: string;
  subcategory: string;
  onRemoveItem: () => void;
  onQuantityChange: () => void;
}
