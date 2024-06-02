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
  isInitiallyWishlisted: boolean;
  onRatingClick: () => void;
}

export interface ReviewsProps {
  reviews: ReviewType[];
}

export interface ReviewType {
  id: string;
  reviewDate: string;
  rating: number;
  comment: string;
  reviewerInitials: { firstName: string, lastName: string }
}

export interface WishlistButtonProps {
  productId: number;
  productName: string;
  isInitiallyWishlisted: boolean;
}

export interface ProductLayoutProps {
  productId: number;
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
  averageRating: number;
  isInitiallyWishlisted: boolean;
  onRatingClick: () => void;
}
