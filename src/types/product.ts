export type CartItem = {
  id: number;
  quantity: number;
  price: string;
  productName: string;
  brand: string;
  thumbnail: string;
  category: string;
  subcategory: string;
};

export type ProductImage = {
  id: number;
  productImage: string;
};

export type Product = {
  id: number;
  thumbnail: string;
  productName: string;
  brand: string;
  averageRating: number;
  price: number;
  stock: number;
  subcategory: string;
  category: string;
  onWishlistToggle: (id: number) => void;
  onAddToCart: (id: number) => void;
  className?: string;
  isAddingToCart: boolean;
  isTogglingWishlist: boolean;
};

export type CarouselProduct = {
  id: number;
  productName: string;
  brand: string;
  price: number;
  thumbnail: string;
  subcategory: string;
  category: string;
  onWishlistToggle: (id: number) => void;
  isTogglingWishlist: (id: number) => boolean;
};

export type ProductDetails = {
  productId: number;
  subcategory?: string;
  category?: string;
  productName: string;
  brand: string;
  thumbnail: string;
  images: ProductImage[];
  setSelectedImage: (image: string) => void;
  selectedImage?: string;
  price: string;
  quantity: number;
  decrementQuantity: () => void;
  handleQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  incrementQuantity: () => void;
  stock: number;
  handleAddToCart: (quantity: number) => void;
  handleBuyNow: () => Promise<void>;
  isNavigatingToCheckout: boolean;
  addingToCart: boolean;
  averageRating: number;
  onRatingClick: () => void;
  onWishlistToggle: (id: number) => void;
};
