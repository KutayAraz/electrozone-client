export interface SubcategoryProps {
  subcategoryName: string;
  topSelling: Product[];
  topWishlisted: Product[];
}

export interface Product {
  id: string;
  subcategoryName: string;
  productName: string;
  thumbnail: string;
}

