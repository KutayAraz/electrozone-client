import { ProductCardProps } from "@/common/ProductCard";

export interface SubcategoryProps {
  id: number;
  subcategory: string;
  topSelling: {products: ProductCardProps[], productQuantity: number};
  topWishlisted: {products: ProductCardProps[], productQuantity: number};
}
