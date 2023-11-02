export interface Product {
  id: number;
  productName: string;
  brand: string;
  thumbnail: string;
  description: string;
  price: number;
  averageRating: number;
  subcategory: string;
  category: string;
}

export interface ProductListProps {
  products: Product[];
}

export interface ProductCardProps {
  id: number;
  thumbnail: string;
  productName: string;
  brand: string;
  averageRating: number;
  price: number;
  subcategory: string;
  category: string;
}
