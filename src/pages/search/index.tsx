import { useEffect, useMemo, useRef, useState } from "react";
import { defer, useLoaderData, useLocation, useSearchParams } from "react-router-dom";
import useFetch from "@/common/Hooks/use-fetch";
import { ProductType } from "./types";
import ProductCard from "@/common/ProductCard";
import FormControl from "@mui/material/FormControl";
import { Box, Button, Checkbox, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, TextField, Typography } from "@mui/material";
import useScreenValue from "@/common/Hooks/use-screenValue";
import { initialProductsToFetch } from "@/utils/initial-products-to-fetch";

const SearchResultsPage = () => {
  const { searchResults, brandsData, priceRangeData, skipped }: any = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [productsData, setProducts] = useState<any>(searchResults);
  const [productsToSkip, setProductsToSkip] = useState<number>(skipped)
  const encodedSearchQuery = searchParams.get('query');

  // Decode the search query to get the original search text
  const query = decodeURIComponent(encodedSearchQuery || '');
  const { fetchData, isLoading } = useFetch();
  const [sortKey, setSortKey] = useState('relevance');
  const initialPriceMin = parseFloat(searchParams.get("min_price") || "0");
  const initialPriceMax = parseFloat(searchParams.get("max_price") || String(priceRangeData.max));
  const brandsParam = searchParams.get('brands');
  const stockStatusParam = searchParams.get('stock_status') || "";
  const brandsArray = brandsParam ? brandsParam.split(' ').map(decodeURIComponent) : [];
  const screenValue = useScreenValue()
  const [priceRange, setPriceRange] = useState<any>([initialPriceMin, initialPriceMax]);

  const observerTarget = useRef<any>(null);
  const [hasMore, setHasMore] = useState(true);
  const location = useLocation();
  const [selectedBrands, setSelectedBrands] = useState<string[]>(brandsArray);
  const [stockStatus, setStockStatus] = useState<any>(stockStatusParam);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const fetchMoreProducts = async () => {
        for (const entry of entries) {
          if (entry.isIntersecting && hasMore) {
            const brands = searchParams.get("brands")
            const min_price = searchParams.get("min_price")
            const max_price = searchParams.get("max_price")

            let options: any = {};

            // Conditionally add parameters to the options object
            if (brands) options.brands = brands;
            if (min_price) options.min_price = parseFloat(min_price); // Assuming you want a number
            if (max_price) options.max_price = parseFloat(max_price);
            let sort = searchParams.get("sort");
            if (!sort) sort = "relevance"
            try {
              const { products } = await searchProducts(query!, sort, productsToSkip, screenValue, options);

              if (products.length === screenValue) {
                console.log("i am here")
                setProducts((prev: any) => [...prev, ...products]);
                setProductsToSkip((prev: number) => prev + screenValue)
              } else if (products.length < screenValue) {
                console.log("i am here1")
                setProducts((prev: any) => [...prev, ...products]);
                setProductsToSkip((prev: number) => prev + screenValue)
                setHasMore(false);
              } else {
                console.log("i am here2")
                setHasMore(false);
              }
            } catch (error) {
              console.error("Failed to fetch products:", error);
            }
          }
        }
      };

      fetchMoreProducts();
    }, { threshold: 0.1 });

    const currentElement = observerTarget.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [location, productsData, screen, productsToSkip]);


  useEffect(() => {
    setProductsToSkip(initialProductsToFetch())
    setProducts(searchResults)
    setHasMore(true)
    setPriceRange([initialPriceMin, initialPriceMax])
    setSelectedBrands(brandsArray)
    setStockStatus(stockStatusParam)
  }, [location]);

  const handleSortChange = async (e: any) => {
    const newSortMethod = e.target.value;

    // Get current search parameters
    const currentParams = new URLSearchParams(searchParams.toString());

    // Set the new sort method, updating 'sort' parameter, keeping others intact
    currentParams.set('sort', newSortMethod);

    // Update the search parameters in the URL
    setSearchParams(currentParams);
  };


  const handlePriceChange = (event: any, newValue: any) => {
    setPriceRange(newValue);
  };

  // Handler for stock checkboxes
  const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    let newStockStatus: string;
    if (name === 'all') {
      newStockStatus = stockStatus === 'all' ? '' : 'all';
    } else if (name === 'in_stock') {
      newStockStatus = stockStatus === 'in_stock' ? '' : 'in_stock';
    } else {
      newStockStatus = ''; // Fallback for unexpected name values
    }

    setStockStatus(newStockStatus);
  };

  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const handlePriceInputChange = (event: any) => {
    const target = event.target;
    const value = target.value === '' ? '' : Number(target.value);
    const name = target.name;

    if (name === 'minPrice') {
      setPriceRange([value, priceRange[1]]);
    } else if (name === 'maxPrice') {
      setPriceRange([priceRange[0], value]);
    }
  };

  const handleBlur = () => {
    if (priceRange[0] < priceRangeData.min) {
      setPriceRange([priceRangeData.min, priceRange[1]]);
    } else if (priceRange[1] > priceRangeData.max) {
      setPriceRange([priceRange[0], priceRangeData.max]);
    }
  };

  const handleFiltering = async (event: any) => {
    event.preventDefault();

    const newSearchParams = new URLSearchParams();
    const sort = searchParams.get('sort') || 'featured';
    newSearchParams.set('sort', String(sort));

    if (selectedBrands.length > 0) {
      const brandsString = selectedBrands.map(encodeURIComponent).join(' ');
      newSearchParams.set("brands", brandsString);
    }

    // Only add the parameter if it has a value that changes the query
    if (priceRange[0] !== 0) newSearchParams.set('min_price', String(priceRange[0]));
    if (priceRange[1] !== priceRangeData.max) newSearchParams.set('max_price', String(priceRange[1]));

    if (stockStatus !== "") {
      newSearchParams.set('stock_status', stockStatus);
    }

    setSearchParams(newSearchParams);
  };

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
              <MenuItem value={"relevance"}>
                <Typography variant="body2">Relevance</Typography>
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
        <div className="flex flex-col min-w-[20%] px-6">
          <h4 className="text-xl text-gray-700 font-semibold">Stock Status</h4>
          <FormControlLabel
            control={<Checkbox checked={stockStatus === 'all'} onChange={handleStockChange} name="all" />}
            label="Include All"
          />
          <FormControlLabel
            control={<Checkbox checked={stockStatus === 'in_stock'} onChange={handleStockChange} name="in_stock" />}
            label="Exclude Out of Stock"
          />
          <h4 className="text-xl text-gray-700 font-semibold mt-4">Brands</h4>
          {brandsData.map((brand: string, index: number) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  name={brand}
                />
              }
              label={brand}
            />
          ))}
          <h4 className="text-xl text-gray-700 font-semibold my-6">Price Range</h4>
          <Slider
            getAriaLabel={() => 'Price range'}
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            step={Math.floor((priceRangeData.max - priceRangeData.min) / 10)}
            min={0}
            max={priceRangeData.max}
            getAriaValueText={(value) => `${value}`}
          />
          <div className="flex mb-2">
            <TextField
              name="minPrice"
              value={priceRange[0]}
              onChange={handlePriceInputChange}
              onBlur={handleBlur}
              size="small"
              inputProps={{
                step: 10,
                min: priceRangeData.min,
                max: priceRangeData.max,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
            <TextField
              name="maxPrice"
              value={priceRange[1]}
              onChange={handlePriceInputChange}
              onBlur={handleBlur}
              size="small"
              inputProps={{
                step: 10,
                min: priceRangeData.min,
                max: priceRangeData.max,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            /></div>

          <Button type="submit" variant="contained" onClick={handleFiltering}>Filter</Button>
        </div>
        {isLoading("searchingQuery") ? <p className="text-gray-700 w-full italic">Loading...</p> :
          productsData.length > 0 ? (
            productsData.map((product: ProductType, index: number) => {
              const isThirdToLast = index === productsData.length - 3;
              return <ProductCard
                id={product.id}
                key={product.id}
                ref={isThirdToLast ? observerTarget : null}
                productName={product.productName}
                brand={product.brand}
                thumbnail={product.thumbnail}
                price={product.price}
                averageRating={product.averageRating}
                subcategory={product.subcategory}
                category={product.category}
              />
            })
          ) : (
            <p className="text-gray-700 w-full italic">No products found.</p>
          )}
      </div>
    </div>
  );
};

export default SearchResultsPage;

const searchProducts = async (searchQuery: string, sort: string, skip: number, limit: number = 6, filters: any = {}) => {

  const queryParams = new URLSearchParams({
    skip: String(skip),
    limit: String(limit),
    query: searchQuery, // Add the search query
    sort: sort, // Add the sort option
  });

  // Conditionally add filters
  if (filters.stock_status) queryParams.set('stock_status', filters.stock_status);
  if (filters.min_price) queryParams.set('min_price', String(filters.min_price));
  if (filters.max_price) queryParams.set('max_price', String(filters.max_price));
  if (filters.brands) queryParams.set('brands', filters.brands);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/products?${queryParams}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch data");
};

export async function loader({ params, request }: any) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const query = searchParams.get('query');
  const initProdCount = initialProductsToFetch();

  let sort = searchParams.get('sort')
  if (!sort) sort = "relevance"

  // Always fetch products as they depend on dynamic filters
  const filters: {
    stock_status: string | null;
    min_price: number;
    brands: any | null;
    max_price?: number; // Make max_price optional
  } = {
    stock_status: searchParams.get('stock_status'),
    min_price: parseFloat(searchParams.get('min_price') || '0'),
    brands: searchParams.get('brands'),
  };

  const { products, availableBrands, priceRange } = await searchProducts(query!, sort, 0, initProdCount, filters);

  return defer({
    searchResults: products,
    brandsData: availableBrands,
    skipped: initProdCount,
    priceRangeData: priceRange
  });
};