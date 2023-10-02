export interface ProductProps {
  id: number;
  productName: string;
  brand: string;
  description: string[];
  averageRating: string;
  thumbnail: string;
  price: number;
  stock: number;
  images: string[] | null;
  category:string;
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
