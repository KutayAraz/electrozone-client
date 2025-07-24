import { ProductImage } from "@/types/product";

export type ProductLayoutProps = {
  productId: number;
  subcategory: string;
  category: string;
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
