export interface ReviewType {
  date: Date;
  rating: number;
  comment: string;
}

export interface ProductPageProps {
  name: string;
  brand: string;
  description: string;
  thumbnail: string;
  price: number;
  stock: number;
  avgRating: number;
  images: string[];
}
