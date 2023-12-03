import { ProductCardProps } from "@/common/ProductCard";

export interface SubcategoryProps {
  id: number;
  category: string;
  subcategory: string;
  topSelling: ProductCardProps[];
  topWishlisted: ProductCardProps[];
}
