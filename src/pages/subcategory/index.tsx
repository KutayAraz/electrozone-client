import {
  defer,
  useLoaderData,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Suspense, useEffect, useRef, useState } from "react";
import { Box, Button, Checkbox, CircularProgress, Divider, Drawer, FormControlLabel, IconButton, InputLabel, ListItemIcon, MenuItem, Select, SelectChangeEvent, Slider, TextField, Typography, useMediaQuery } from "@mui/material";
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from "@mui/material/FormControl";
import loaderFetch from "@/utils/loader-fetch";
import ProductList from "./components/ProductList";
import useScreenValue from "@/hooks/use-screen-value";
import { initialProductsToFetch } from "@/utils/initial-products-to-fetch";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/stores/store";
import { toggleFilterDrawer, toggleSortingDrawer } from "@/stores/slices/ui-slice";
import PageHelmet from "@/components/seo/page-helmet";
import { formatString } from "@/utils/format-casing";

export const SubcategoryPage = () => {
  const { subcategoryData, brandsData, priceRangeData, skipped, productQuantity }: any = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { subcategory }: any = useParams();
  const [productsData, setProducts] = useState<any>(subcategoryData);
  const [productsToSkip, setProductsToSkip] = useState<number>(skipped)
  const [hasMore, setHasMore] = useState(true);
  const initialPriceMin = parseFloat(searchParams.get("min_price") || "0");
  const initialPriceMax = parseFloat(searchParams.get("max_price") || String(priceRangeData.max));
  const brandsParam = searchParams.get('brands');
  const stockStatusParam = searchParams.get('stock_status') || "";
  const brandsArray = brandsParam ? brandsParam.split(' ').map(decodeURIComponent) : [];
  const [selectedBrands, setSelectedBrands] = useState<string[]>(brandsArray);
  const [priceRange, setPriceRange] = useState<any>([initialPriceMin, initialPriceMax]);
  const [stockStatus, setStockStatus] = useState<any>(stockStatusParam);
  const observerTarget = useRef<any>(null);
  const location = useLocation();
  const screenValue = useScreenValue();
  const dispatch = useDispatch<any>();

  const filterDrawer = useSelector((state: RootState) => state.ui.filterDrawer)
  const sortingDrawer = useSelector((state: RootState) => state.ui.sortingDrawer)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const fetchMoreProducts = async () => {
        for (const entry of entries) {
          if (entry.isIntersecting && hasMore) {
            if (productsData.length < screenValue) {
              setHasMore(false);
              return
            }
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
              const { products } = await fetchProducts(subcategory, sort, productsToSkip, screenValue, options);

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

  const handleSortChange = async (valueOrEvent: any) => {
    let newSortMethod;

    // Check if the argument is an event (from Select) or a direct value (from MenuItem)
    if (typeof valueOrEvent === 'string') {
      // Direct string value from MenuItem onClick
      newSortMethod = valueOrEvent;
    } else {
      // Extract value from event object (from Select onChange)
      newSortMethod = valueOrEvent.target.value;
    }

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
      setPriceRange([0, priceRange[1]]);
    } else if (priceRange[1] > priceRangeData.max) {
      setPriceRange([priceRange[0], priceRangeData.max]);
    }
  };

  const handleFiltering = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
    <>
      <PageHelmet title={`${formatString(subcategory, "-")} | Electrozone`} description="Explore detailed subcategories of electronics at Electrozone to narrow down your search." />
      <div className="max-w-screen-lg mx-auto my-2 sm:px-2 max-[1296px]:px-0">
        <Drawer open={sortingDrawer} onClose={() => dispatch(toggleSortingDrawer(false))} anchor="bottom" >
          <div className="pb-2 [&_li]:px-6 [&_li]:py-3">
            <div className="flex justify-between px-6 items-center py-[8px]">
              <div className="flex space-x-3">
                <SortIcon style={{ color: '#757575' }} />
                <Typography variant="body1" sx={{ color: "#373D51" }}>Sort By</Typography>
              </div>
              <div className="">
                <IconButton
                  onClick={() => dispatch(toggleSortingDrawer(false))}
                  sx={{
                    color: (theme) => theme.palette.grey[500],
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <Divider />
            <MenuItem value={"featured"} onClick={() => { handleSortChange("featured"), dispatch(toggleSortingDrawer(false)) }}>
              <ListItemIcon >
                <StarBorderIcon />
              </ListItemIcon>
              <Typography variant="body1" sx={{ color: "#373D51" }}>Featured</Typography>
            </MenuItem>
            <MenuItem value={"rating"} onClick={() => { handleSortChange("rating"), dispatch(toggleSortingDrawer(false)) }}>
              <ListItemIcon >
                <TrendingUpIcon />
              </ListItemIcon>
              <Typography variant="body1" sx={{ color: "#373D51" }}>Ratings</Typography>
            </MenuItem>
            <MenuItem value={"price_ascending"} onClick={() => { handleSortChange("price_ascending"), dispatch(toggleSortingDrawer(false)) }}>
              <ListItemIcon >
                <ArrowUpwardIcon />
              </ListItemIcon>
              <Typography variant="body1" sx={{ color: "#373D51" }}>Price Ascending</Typography>
            </MenuItem>
            <MenuItem value={"price_descending"} onClick={() => { handleSortChange("price_descending"), dispatch(toggleSortingDrawer(false)) }}>
              <ListItemIcon >
                <ArrowDownwardIcon />
              </ListItemIcon>
              <Typography variant="body1" sx={{ color: "#373D51" }}>Price Descending</Typography>
            </MenuItem>
          </div>
        </Drawer>
        <Drawer
          anchor="bottom"
          open={filterDrawer}
          onClose={() => dispatch(toggleFilterDrawer(false))}
          sx={{
            '& .MuiDrawer-paper': { maxHeight: '80%', overflow: 'auto' },
          }}
        >
          <IconButton
            onClick={() => dispatch(toggleFilterDrawer(false))}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <div className="p-6 pb-3">
            {/* Stock Status */}
            <p className="text-lg">Stock Status</p>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', // Creates columns with a minimum width of 200px
              gap: 0, // Adjusts the space between grid items
            }}>
              <FormControlLabel
                control={<Checkbox checked={stockStatus === 'all'} onChange={handleStockChange} name="all " />}
                label="Include All"
                sx={{
                  '& .MuiSvgIcon-root': { // Targeting the icon inside the checkbox
                    fontSize: '1rem', // Adjust icon size if necessary
                  },
                }}
              />
              <FormControlLabel
                control={<Checkbox checked={stockStatus === 'in_stock'} onChange={handleStockChange} name="in_stock" />}
                label="Only in Stock"
                sx={{
                  '& .MuiSvgIcon-root': { // Targeting the icon inside the checkbox
                    fontSize: '1rem', // Adjust icon size if necessary
                  },
                }}
              />
            </Box>
            {/* Brands */}
            <p className="text-lg mt-1">Brands</p>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', // Creates columns with a minimum width of 200px
              gap: 0, // Adjusts the space between grid items
            }}>
              {brandsData.map((brand: any, index: number) => (
                <FormControlLabel
                  key={index}
                  control={<Checkbox checked={selectedBrands.includes(brand)} onChange={() => handleBrandChange(brand)} name={brand} />}
                  label={brand}
                  sx={{
                    justifyContent: "start",
                    '& .MuiSvgIcon-root': { // Targeting the icon inside the checkbox
                      fontSize: '1rem', // Adjust icon size if necessary
                    },
                  }} // Aligns the FormControlLabel contents to the start, ensuring checkboxes are aligned
                />
              ))}
            </Box>

            {/* Price Range */}
            <p className="mt-2 text-lg">Price Range</p>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              step={Math.floor((priceRangeData.max - priceRangeData.min) / 10)}
              min={0}
              max={priceRangeData.max}
              getAriaValueText={(value) => `$${value}`}
              valueLabelFormat={(value) => `$${value}`}
              sx={{
                '& .MuiSlider-thumb': {
                  color: '#13193F', // Changes the thumb color
                },
                '& .MuiSlider-track': {
                  color: '#13193F', // Changes the track color
                },
                maxWidth: '95%',
                mx: 'auto',
                display: "flex"
              }}
            />

            {/* Price Input Fields */}
            <div className="flex space-x-2 mb-2">
              <div className="flex-1">
                <TextField
                  fullWidth // This prop makes the TextField take the full width of its parent container
                  name="minPrice"
                  value={priceRange[0]}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        $
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className="flex-1">
                <TextField
                  fullWidth // This prop makes the TextField take the full width of its parent container
                  name="maxPrice"
                  value={priceRange[1]}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        $
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            {/* Filter Button */}
            <Button type="submit" variant="contained" onClick={(e) => { handleFiltering(e), dispatch(toggleFilterDrawer(false)) }} sx={{
              backgroundColor: '#13193F', // Replace with your desired background color
              '&:hover': {
                backgroundColor: '#1e40af', // Replace with your desired hover color
              },
              width: '100%'
            }}>Filter</Button>
          </div>
        </Drawer>
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <p>Loading Products.. <CircularProgress /></p>
        </div>}>
          <div className="flex flex-row items-start sm:space-x-2">

            {/* FilterMenu */}
            <div className={`flex-col sticky w-48 md:w-60 flex-shrink-0 sm:top-[150px] md:top-28 h-[calc(100vh-135px)] hidden sm:flex overflow-y-auto`}>
              <h3 className="text-lg font-bold mb-2">
                {subcategory ? subcategory.toUpperCase().replace(/-/g, " ") : "Products"}
              </h3>
              <div className="flex flex-col overflow-y-auto overflow-x-hidden" >
                <h4 className="text-lg font-semibold mb-1">Stock Status</h4>
                <FormControlLabel
                  control={<Checkbox
                    sx={{
                      '& .MuiSvgIcon-root': {
                        fontSize: '1.1rem',
                      },
                      '&.MuiButtonBase-root': {
                        paddingLeft: '10px',
                        paddingRight: '6px',
                        paddingTop: '5px',
                        paddingBottom: '5px'
                      },
                    }} checked={stockStatus === 'all'} onChange={handleStockChange} name="all" />}
                  label="Include All"
                />
                <FormControlLabel
                  control={<Checkbox
                    sx={{
                      '& .MuiSvgIcon-root': { // Targeting the icon inside the checkbox
                        fontSize: '1.1rem', // Adjust icon size if necessary
                      },
                      '&.MuiButtonBase-root': { // Targeting the ButtonBase root element of the checkbox
                        paddingLeft: '10px', // Decreasing padding to 4px
                        paddingRight: '6px', // Decreasing padding to 4px
                        paddingTop: '5px',
                        paddingBottom: '5px'
                      },
                    }} checked={stockStatus === 'in_stock'} onChange={handleStockChange} name="in_stock" />}
                  label="Only in Stock" className="text-sm"
                />
                <Divider sx={{ marginY: "5px", marginRight: "8px" }} />

                <h4 className="text-lg font-semibold">Brands</h4>
                {brandsData.map((brand: string, index: number) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        sx={{
                          '& .MuiSvgIcon-root': { // Targeting the icon inside the checkbox
                            fontSize: '1.1rem', // Adjust icon size if necessary
                          },
                          '&.MuiButtonBase-root': { // Targeting the ButtonBase root element of the checkbox
                            paddingLeft: '10px', // Decreasing padding to 4px
                            paddingRight: '6px', // Decreasing padding to 4px
                            paddingY: '5px',
                          },
                        }}
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandChange(brand)}
                        name={brand}
                      />
                    }
                    label={brand}
                    sx={{

                      '& .MuiFormControlLabel-label': { // Targeting the label directly if you need to adjust its styling
                        fontSize: '1rem', // Adjust label font size if necessary
                      },
                    }}
                  />
                ))}
                <Divider sx={{ marginY: "5px", marginRight: "8px" }} />

                <h4 className="text-lg font-semibold mb-2">Price Range</h4>
                <Slider
                  getAriaLabel={() => 'Price range'}
                  value={priceRange}
                  onChange={handlePriceChange}
                  step={Math.floor((priceRangeData.max) / 8)}
                  min={0}
                  max={priceRangeData.max}
                  getAriaValueText={(value) => `$${value}`} // Adds a "$" sign for screen readers
                  sx={{
                    maxWidth: '85%',
                    mx: 'auto',
                    '& .MuiSlider-thumb': {
                      color: '#13193F', // Changes the thumb color
                    },
                    '& .MuiSlider-track': {
                      color: '#13193F', // Changes the track color
                    },
                  }}
                />

                <div className="flex space-x-2 mb-2">
                  <TextField
                    name="minPrice"
                    value={priceRange[0]}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    size="small"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{
                          mr: '4px', // Adjust right margin to reduce space
                          fontSize: '0.5rem'
                        }}>
                          $
                        </InputAdornment>
                      ),
                      sx: {
                        // Targeting the input text for font size adjustment
                        '.MuiInputBase-input': {
                          fontSize: '0.875rem',
                        },
                      },
                    }}
                    inputProps={{
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
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{
                          mr: '2px', // Adjust right margin to reduce space
                          paddingX: '0px',
                          fontSize: '0.5rem'
                        }}>
                          $
                        </InputAdornment>
                      ),
                      sx: {
                        // Targeting the input text for font size adjustment
                        '.MuiInputBase-input': {
                          fontSize: '0.875rem', // Adjust the font size as needed
                        },
                      },
                    }}
                    inputProps={{
                      min: priceRangeData.min,
                      max: priceRangeData.max,
                      type: 'number',
                      'aria-labelledby': 'input-slider',
                    }}
                  />
                </div>
              </div>
              <div className="mt-2">
                <button type="submit"
                  className="bg-theme-blue w-full hover:bg-[#1e40af] rounded-md py-2 text-white"
                  onClick={handleFiltering}>
                  FILTER
                </button>
              </div>
            </div>

            <div className="flex grow flex-wrap sm:mt-4">
              <h5 className="sm:hidden text-lg self-end px-2">Listing {productQuantity} products for {formatString(subcategory, "-")}</h5>
              {/* Sorting Menu */}
              <div className="hidden sm:flex justify-between w-full px-2 mb-4">
                <h5 className="text-lg self-end">Listing {productQuantity} products for {formatString(subcategory, "-")}</h5>
                <FormControl className="rounded-lg shadow-md">
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
              </div>
              <ProductList products={productsData} ref={observerTarget} />
            </div>
          </div>
        </Suspense>
      </div>
    </>

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
    `${import.meta.env.VITE_API_URL}/subcategory/${subcategoryUrl}?sort_by=${sort}?${queryParams}`
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
    const brandsResponse = await loaderFetch(`${import.meta.env.VITE_API_URL}/subcategory/${subcategory}/brands`, "GET");
    brandsData = brandsResponse.data;
    sessionStorage.setItem(`${subcategoryKey}-brandsData`, JSON.stringify(brandsData));
  }

  if (!priceRangeData) {
    const priceRangeResponse = await loaderFetch(`${import.meta.env.VITE_API_URL}/subcategory/${subcategory}/price-range`, "GET");
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

  // Conditionally add max_price only if it exists
  const maxPrice = searchParams.get('max_price');
  if (maxPrice !== null) {
    filters.max_price = parseFloat(maxPrice);
  }

  const { products, productQuantity } = await fetchProducts(subcategory, sort, 0, initProdCount, filters);

  return defer({
    subcategoryData: products,
    brandsData,
    priceRangeData,
    skipped: initProdCount,
    productQuantity
  });
};
