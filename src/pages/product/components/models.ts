export interface ProductProps {
  id: number;
  productName: string;
  brand: string;
  description: string[];
  averageRating: number;
  thumbnail: string;
  price: number;
  stock: number;
  images: Array<{ id: number; productImage: string }>;
  category: string;
  subcategory: string;
  isWishlisted: boolean;
  updateWishlistStatus: (status: boolean) => void;
}

export interface ReviewsProps {
  reviews: ReviewType[];
}

export interface ReviewType {
  id: string;
  reviewDate: string;
  rating: number;
  comment: string;
}

export interface WishlistButtonProps {
  isWishlisted: boolean;
  toggleWishlist: () => void;
}

export interface ProductLayoutProps {
  productName: string;
  brand: string;
  thumbnail: string;
  images: Array<{ id: number; productImage: string }>;
  setSelectedImage: (image: string) => void;
  selectedImage?: string;
  price: number;
  quantity: number;
  decrementQuantity: () => void;
  handleQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  incrementQuantity: () => void;
  stock: number;
  handleAddToCart: () => void;
  handleBuyNow: () => void;
  addingToCart: boolean;
  navigatingToCart: boolean;
  averageRating: number;
  isWishlisted: boolean;
  toggleWishlist: () => void;
}
