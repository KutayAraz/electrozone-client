import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "@/common/Hooks/use-fetch";
import { ProductType } from "./types";
import ProductCard from "@/common/ProductCard";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const query = searchParams.get("query");
  const { fetchData } = useFetch();

  useEffect(() => {
    const fetchResults = async () => {
      const encodedQuery = encodeURIComponent(query || "");
      const result = await fetchData(
        `${import.meta.env.VITE_API_URL}/products?search=${encodedQuery}`,
        "GET"
      );
      if (result?.response.ok) {
        setResults(result.data);
      } else {
        console.error("Failed to fetch search results");
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  return (
    <div>
      <h1 className="mx-[1%] my-2">Search Results for "{query}"</h1>
      <div className="flex flex-wrap mx-auto px-2">
        {results.map((product: ProductType) => (
          <ProductCard
            id={product.id}
            key={product.id}
            productName={product.productName}
            brand={product.brand}
            thumbnail={product.thumbnail}
            price={product.price}
            averageRating={product.averageRating}
            subcategory={product.subcategory}
            category={product.category}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
