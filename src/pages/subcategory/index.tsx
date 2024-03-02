import {
  defer,
  useLoaderData,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Suspense, useEffect, useRef, useState } from "react";
import { Box, Button, Checkbox, CircularProgress, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Slider, TextField, Typography, useMediaQuery } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import loaderFetch from "@/utils/loader-fetch";
import ProductList from "./components/ProductList";
import useScreenValue from "@/common/Hooks/use-screenValue";
import { initialProductsToFetch } from "@/utils/initial-products-to-fetch";
import FilterMenu from "./components/FilterMenu";

const SubcategoryPage = () => {
  const { subcategoryData, brandsData, priceRangeData, skipped }: any = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { subcategory }: any = useParams();
  const [productsData, setProducts] = useState<any>(subcategoryData);
  const [productsToSkip, setProductsToSkip] = useState<number>(skipped)
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const initialPriceMin = parseFloat(searchParams.get("min_price") || "0");
  const initialPriceMax = parseFloat(searchParams.get("max_price") || String(priceRangeData.max));
  const brandsParam = searchParams.get('brands');
  const stockStatusParam = searchParams.get('stock_status') || "";
  const brandsArray = brandsParam ? brandsParam.split(' ').map(decodeURIComponent) : [];
  const [selectedBrands, setSelectedBrands] = useState<string[]>(brandsArray);
  const [priceRange, setPriceRange] = useState<any>([initialPriceMin, initialPriceMax]);
  const [stockStatus, setStockStatus] = useState<any>(stockStatusParam);
  const [brand, setBrand] = useState(brandsData);
  const observerTarget = useRef<any>(null);
  const location = useLocation();
  const screenValue = useScreenValue();


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
            if (!sort) sort = "featured"
            try {
              const products = await fetchProducts(subcategory, sort, productsToSkip, screenValue, options);

              if (products.length === screenValue) {
                setProducts((prev: any) => [...prev, ...products]);
                setProductsToSkip((prev: number) => prev + screenValue)
              } else if (products.length < screenValue) {
                setProducts((prev: any) => [...prev, ...products]);
                setProductsToSkip((prev: number) => prev + screenValue)
                setHasMore(false);
              } else {
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
    setProducts(subcategoryData)
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

  const handleInputChange = (event: any) => {
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
    <div>
      <div className="flex justify-between items-center px-[1%] py-4">
        <h3 className="text-xl font-semibold text-gray-600 ">
          {subcategory ? subcategory.toUpperCase() : "Products"}
        </h3>

        <Box sx={{ minWidth: 120, maxHeight: "80px" }}>
          <FormControl className="rounded-lg shadow-md ">
            <InputLabel id="sort-by" sx={{ fontSize: "1rem" }}>
              Sort By
            </InputLabel>
            <Select
              id="sort-by"
              label="Sort By"
              value={searchParams.get("sort") || "featured"}
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
      <Suspense fallback={<p>Loading Products..</p>}>
        <div className="flex">
          {/* <FilterMenu /> */}
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
              onChange={handleInputChange}
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
                onChange={handleInputChange}
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
          <ProductList products={productsData} ref={observerTarget} />
        </div>
      </Suspense>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default SubcategoryPage;

const fetchProducts = async (subcategory: string, sort: string, skip: number, limit: number = 6, filters: any = {}) => {
  const subcategoryUrl = subcategory.replace(/-/g, "_");
  const queryParams = new URLSearchParams({
    skip: String(skip),
    limit: String(limit),
  });

  // Conditionally add filters
  if (filters.stock_status) queryParams.set('stock_status', filters.stock_status);
  if (filters.min_price) queryParams.set('min_price', String(filters.min_price));
  if (filters.max_price) queryParams.set('max_price', String(filters.max_price));
  if (filters.brands) queryParams.set('brands', filters.brands);

  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/subcategories/${subcategoryUrl}/${sort}?${queryParams}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch data");
};


export async function loader({ params, request }: any) {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const subcategory = params.subcategory.replace(/-/g, "_");
  const subcategoryKey = `subcategory-${subcategory}`;
  const initProdCount = initialProductsToFetch();

  // Modify the key to include subcategory for specificity
  let brandsData = sessionStorage.getItem(`${subcategoryKey}-brandsData`);
  let priceRangeData = sessionStorage.getItem(`${subcategoryKey}-priceRangeData`);

  // Convert string back to object
  brandsData = brandsData ? JSON.parse(brandsData) : null;
  priceRangeData = priceRangeData ? JSON.parse(priceRangeData) : null;

  // Only fetch if not already cached for the current subcategory
  if (!brandsData) {
    const brandsResponse = await loaderFetch(`${import.meta.env.VITE_API_URL}/subcategories/${subcategory}/brands`, "GET");
    brandsData = brandsResponse.data;
    sessionStorage.setItem(`${subcategoryKey}-brandsData`, JSON.stringify(brandsData));
  }

  if (!priceRangeData) {
    const priceRangeResponse = await loaderFetch(`${import.meta.env.VITE_API_URL}/subcategories/${subcategory}/price-range`, "GET");
    priceRangeData = priceRangeResponse.data;
    sessionStorage.setItem(`${subcategoryKey}-priceRangeData`, JSON.stringify(priceRangeData));
  }
  let sort = searchParams.get('sort')
  if (!sort) sort = "featured"

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

  console.log("filters are ", filters)

  // Conditionally add max_price only if it exists
  const maxPrice = searchParams.get('max_price');
  if (maxPrice !== null) {
    filters.max_price = parseFloat(maxPrice);
  }

  const products = await fetchProducts(subcategory, sort, 0, initProdCount, filters);

  return defer({
    subcategoryData: products,
    brandsData: brandsData,
    priceRangeData: priceRangeData,
    skipped: initProdCount
  });
};


