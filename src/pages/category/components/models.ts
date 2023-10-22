export interface SubcategoryProps {
  id: number;
  subcategoryName: string;
  topSelling: CategoryProductProps[];
  topWishlisted: CategoryProductProps[];
}

export interface CategoryProductProps {
  id: string;
  subcategoryName: string;
  productName: string;
  brand: string;
  thumbnail: string;
  averageRating: string;
  price: number;
}
