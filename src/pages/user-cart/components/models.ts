interface CartItemCardProps {
  id: number;
  productName: string;
  thumbnail: string;
  quantity: number;
  price: string;
  amount: number;
  category: string;
  subcategory: string;
  onRemoveItem: () => void;
  onQuantityChange: () => void;
}
