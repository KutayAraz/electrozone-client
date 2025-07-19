import { Divider } from "@mui/material";

import { Carousel } from "@/components/ui/carousel";
import { Spinner } from "@/components/ui/spinner";

import { useGetSuggestedProductsQuery } from "../api/get-suggested-products";

type SuggestedProductsProps = {
  id: number;
  onWishlistToggle: (id: number) => void;
  isTogglingWishlist: (id: number) => boolean;
};

export const SuggestedProducts = ({
  id,
  onWishlistToggle,
  isTogglingWishlist,
}: SuggestedProductsProps) => {
  const { data: suggestedProducts, isLoading: isSuggestedProductsLoading } =
    useGetSuggestedProductsQuery(id);
  return (
    <>
      {isSuggestedProductsLoading ? (
        <div className="my-4">
          <Spinner />
        </div>
      ) : (
        suggestedProducts &&
        suggestedProducts.products.length > 0 && (
          <div className="mb-4">
            <Divider />
            <h6 className="my-4 text-center text-lg">{suggestedProducts.suggestionType}</h6>
            <Carousel
              products={suggestedProducts.products}
              onWishlistToggle={onWishlistToggle}
              isTogglingWishlist={isTogglingWishlist}
            />
          </div>
        )
      )}
    </>
  );
};
