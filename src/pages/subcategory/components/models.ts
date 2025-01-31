export interface Product {
  id: number;
  productName: string;
  brand: string;
  thumbnail: string;
  description: string;
  price: number;
  stock: number;
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
  stock: number;
  subcategory: string;
  category: string;
}
