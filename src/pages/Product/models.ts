export interface ReviewType {
  date: Date;
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
  product: {
    id: string;
    productName: string;
    brand: string;
    description: string;
    averageRating: number;
    thumbnail: string;
    price: number;
    stock: number;
    avgRating: number;
    // images: string[];
  };
}
