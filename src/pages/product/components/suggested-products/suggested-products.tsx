import { useState, useEffect } from "react";

import { useFetch } from "@/hooks/use-fetch";

import { SuggestedProductCarousel } from "./suggested-products-carousel";

const SuggestedProducts = ({ productId }: { productId: number }) => {
  const [suggestedProducts, setSuggestedProducts] = useState<any>([]);
  const [suggestionHeader, setSuggestionHeader] = useState<string>("");
  const { isLoading, fetchData } = useFetch();

  useEffect(() => {
    const fetchFrequentlyBoughtTogether = async () => {
      const response = await fetchData(
        `${import.meta.env.VITE_API_URL}/product/${productId}/suggested-products`,
      );
      if (response?.response.ok) {
        setSuggestedProducts(response.data.products);
        setSuggestionHeader(response.data.suggestionType);
      }
    };

    fetchFrequentlyBoughtTogether();
  }, [productId]);

  if (isLoading("products")) return <div>Loading...</div>;

  return (
    <div className="">
      <h6 className="my-4 text-center text-xl">{suggestionHeader}</h6>
      <div className="mb-4">
        <SuggestedProductCarousel products={suggestedProducts} />
      </div>
    </div>
  );
};

export default SuggestedProducts;
