import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../subcategory/components/ProductCard";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const query = searchParams.get("query");

  useEffect(() => {
    const fetchData = async () => {
      const encodedQuery = encodeURIComponent(query || "");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products?search=${encodedQuery}`
      );
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        console.error("Failed to fetch search results");
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <>
        {results.map((product: any) => (
          <ProductCard
            id={product.id}
            productName={product.productName}
            brand={product.brand}
            thumbnail={product.thumbnail}
            price={product.price}
            avgRating={product.avgRating}
          />
        ))}
      </>
    </div>
  );
};

export default SearchResultsPage;
