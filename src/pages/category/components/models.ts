import { ProductCardProps } from "@/common/ProductCard";

export interface SubcategoryProps {
  id: number;
  subcategory: string;
  topSelling: ProductCardProps[];
  topWishlisted: ProductCardProps[];
}
