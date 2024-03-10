import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "@/common/Hooks/use-fetch";
import { ProductType } from "./types";
import ProductCard from "@/common/ProductCard";
import FormControl from "@mui/material/FormControl";
import { Box, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import useScreenValue from "@/common/Hooks/use-screenValue";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState<any>([]);
  const query = searchParams.get("query");
  const { fetchData, isLoading } = useFetch();
  const [sortKey, setSortKey] = useState('featured');
  const screenValue = useScreenValue()

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortKey(event.target.value as string);
  };


  useEffect(() => {
    const fetchResults = async () => {
      const encodedQuery = encodeURIComponent(query || "");
      const result = await fetchData(
        `${import.meta.env.VITE_API_URL}/products?search=${encodedQuery}`,
        "GET",
        null,
        false,
        false,
        "searchingQuery"
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


  const sortedResults = useMemo(() => {
    return [...results].sort((a, b) => {
      switch (sortKey) {
        case 'price_ascending':
          return a.price - b.price;
        case 'price_descending':
          return b.price - a.price;
        case 'rating':
          return b.averageRating - a.averageRating;
        default:
          return 0; // For 'featured' or any other value, no sorting is applied
      }
    });
  }, [results, sortKey]);


  return (
    <div className="page-spacing">
      <div className="flex my-4 justify-between">
        <h1 className="text-gray-700">
          Search Results for "{query}"
        </h1>
        <Box sx={{ minWidth: 120, maxHeight: "80px" }}>
          <FormControl className="rounded-lg shadow-md ">
            <InputLabel id="sort-by" sx={{ fontSize: "1rem" }}>
              Sort By
            </InputLabel>
            <Select
              id="sort-by"
              label="Sort By"
              value={sortKey}
              onChange={handleSortChange}
              sx={{ padding: "2px", "& .MuiSelect-select": { padding: "4px" } }}
            >
              <MenuItem value={"featured"}>
                <Typography variant="body2">Featured</Typography>
              </MenuItem>
              <MenuItem value={"rating"}>
                <Typography variant="body2">Rating</Typography>
              </MenuItem>
              <MenuItem value={"price_ascending"}>
                <Typography variant="body2">Price Ascending</Typography>
              </MenuItem>
              <MenuItem value={"price_descending"}>
                <Typography variant="body2">Price Descending</Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>

      <div className="flex flex-wrap">
        {isLoading("searchingQuery") ? <p className="text-gray-700 w-full italic">Loading...</p> :
          results.length > 0 ? (
            sortedResults.map((product: ProductType) => (
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
            ))
          ) : (
            <p className="text-gray-700 w-full italic">No products found.</p>
          )}
      </div>
    </div>
  );
};

export default SearchResultsPage;
