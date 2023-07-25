export interface Product {
    id: number;
    productName: string;
    brand: string;
    thumbnail: string;
    description: string;
    price: number;
    avgRating: number;
    subcategory: {
      id: number;
      name: string;
    };
  }

  export interface ProductListProps {
    products: Product[]
  }