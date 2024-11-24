import { ProductCardProps } from "@/components/ui/product-card/product-card";

export interface SubcategoryProps {
  id: number;
  subcategory: string;
  topSelling: { products: ProductCardProps[]; productQuantity: number };
  topWishlisted: { products: ProductCardProps[]; productQuantity: number };
}
