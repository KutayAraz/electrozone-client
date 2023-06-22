export interface Review {
  rating: number;
  review: string;
  date: Date;
}

export interface Reviews {
  reviews: Review[];
}

export interface Product {
  product: {
    name: string;
    brand: string;
    images: { img: string; alt: string }[];
    description: string;
    avgRating: number;
    price: number;
    stock: number;
  };
}
