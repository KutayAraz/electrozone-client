import {
  defer,
  useLoaderData,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { Box, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import loaderFetch from "@/utils/loader-fetch";
import ProductList from "./components/ProductList";

const fetchProducts = async (subcategory: string, sort: string) => {
  const subcategoryUrl = subcategory.replace(/-/g, "_");
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/subcategories/${subcategoryUrl}/${sort}`
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

  useEffect(() => {
    const sortMethod = searchParams.get("sort") || "featured";
    fetchProducts(subcategory, sortMethod)
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
