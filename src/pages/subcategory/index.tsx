import {
  defer,
  useLoaderData,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Box, CircularProgress, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import loaderFetch from "@/utils/loader-fetch";
import ProductList from "./components/ProductList";

const fetchProducts = async (subcategory: string, sort: string, page: number) => {
  const subcategoryUrl = subcategory.replace(/-/g, "_");
  const limit = 5; // Define your page size here
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/subcategories/${subcategoryUrl}/${sort}?page=${page}&limit=${limit}`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch data");
};

const SubcategoryPage = () => {
  const { subcategoryData }: any = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { subcategory }: any = useParams();
  const [productsData, setProducts] = useState(subcategoryData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const sortMethod = searchParams.get("sort") || "featured";
    try {
      const newProducts = await fetchProducts(subcategory, sortMethod, page + 1);
      if (newProducts.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts: any) => [...prevProducts, ...newProducts]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [subcategory, searchParams, page, loading, hasMore]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) return;
      loadMoreProducts();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreProducts, loading]);

  useEffect(() => {
    const sortMethod = searchParams.get("sort") || "featured";
    fetchProducts(subcategory, sortMethod, page)
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, [subcategory, searchParams]);

  const handleSortChange = (e: SelectChangeEvent) => {
    setSearchParams({ sort: e.target.value });
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
        <>
          <ProductList products={productsData} />
        </>
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
  const result = await loaderFetch(
    `${import.meta.env.VITE_API_URL}/subcategories/${subcategory}/featured`,
    "GET"
  );
  return defer({
    subcategoryData: result.data,
  });
}
