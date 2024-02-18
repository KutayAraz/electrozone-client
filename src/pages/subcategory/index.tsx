import {
  defer,
  useLoaderData,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Box, CircularProgress, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, useMediaQuery } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import loaderFetch from "@/utils/loader-fetch";
import ProductList from "./components/ProductList";
import useScreenValue from "@/common/Hooks/use-screenValue";
import { initialProductsToFetch } from "@/utils/initial-products-to-fetch";
import FilterMenu from "./components/FilterMenu";

const fetchProducts = async (subcategory: string, sort: string, page: number, limit: number = 6) => {
  const subcategoryUrl = subcategory.replace(/-/g, "_");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/subcategories/${subcategoryUrl}/${sort}?skip=${page}&limit=${limit}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch data");
};

const SubcategoryPage = () => {
  const { subcategoryData, skipped }: any = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { subcategory }: any = useParams();
  const [productsData, setProducts] = useState<any>(subcategoryData);
  const [productsToSkip, setProductsToSkip] = useState<number>(skipped)
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerTarget = useRef<any>(null);
  const location = useLocation();
  const screenValue = useScreenValue();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const fetchMoreProducts = async () => {
        for (const entry of entries) {
          if (entry.isIntersecting && hasMore) {
            try {
              const products = await fetchProducts(subcategory, "featured", productsToSkip, screenValue);
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
  }, [location]);

  const handleSortChange = async (e: SelectChangeEvent) => {
    const newSortMethod = e.target.value;
    setSearchParams({ sort: newSortMethod });

    try {
      const newData = await fetchProducts(subcategory, newSortMethod, 0, screenValue);
      setProducts(newData);
    } catch (error) {
      console.error("Failed to fetch sorted products:", error);
    }
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

export async function loader({ params }: any) {
  const subcategory = params.subcategory.replace(/-/g, "_");
  const initProdCount = initialProductsToFetch()
  const result = await loaderFetch(
    `${import.meta.env.VITE_API_URL}/subcategories/${subcategory}/featured?skip=0&limit=${initProdCount}`,
    "GET",
  );
  return defer({
    subcategoryData: result.data,
    skipped: initProdCount
  });
}
