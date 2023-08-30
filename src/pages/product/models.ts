export interface ReviewType {
  reviewDate: string;
  rating: number;
  comment: string;
}

export interface ProductPageProps {
  productName: string;
  brand: string;
  description: string;
  averageRating: number;
  thumbnail: string;
  price: number;
  stock: number;
  avgRating: number;
  // images: string[];
}

export interface ProductProps {
  id: number;
  productName: string;
  brand: string;
  description: string;
  averageRating: string;
  thumbnail: string;
  price: number;
  stock: number;
  // images: string[];
  isWishlisted: boolean
}

export interface ReviewsProps {
  reviews: ReviewType[];
}
