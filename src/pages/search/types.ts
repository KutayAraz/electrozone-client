export interface ProductType {
  id: number;
  key: number;
  productName: string;
  brand: string;
  thumbnail: string;
  price: number;
  stock: number;
  averageRating: number;
  subcategory: string;
  category: string;
}

export interface ProductListProps {
  productsData: ProductType[];
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