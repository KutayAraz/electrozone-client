export interface SubcategoryProps {
  subcategoryName: string;
  topSelling: CategoryProductProps[];
  topWishlisted: CategoryProductProps[];
}

export interface CategoryProductProps {
  id: string;
  subcategoryName: string;
  productName: string;
  thumbnail: string;
  price: number;
}

