export interface WishlistProductCardProps {
  id: number;
  productName: string;
  brand: string;
  thumbnail: string;
  price: number;
  averageRating: number;
  stock: number;
  subcategory: string;
  category: string;
  onAddToCart: (id: number, e: React.MouseEvent) => void;
  onRemoveFromWishlist: (id: number) => void;
}