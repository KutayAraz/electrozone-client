import {
  Await,
  defer,
  json,
  useLoaderData,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ProductList from "./components/ProductList";
import { Suspense, useEffect, useState } from "react";
import { Box, InputLabel, MenuItem, Select } from "@mui/material";
import { FormControl } from "@mui/base";

const fetchProducts = async (subcategory: string, sort: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/subcategories/${subcategory}/${sort}`
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

  const handleSortChange = (e: any) => {
    setSearchParams({ sort: e.target.value });
  };

  return (
    <div className="bg-gray-100">
      <div className="flex justify-between items-center px-2 my-1">
        <h3 className="text-xl font-semibold text-gray-600">
          {subcategory ? subcategory.toUpperCase() : "Products"}
        </h3>
        <Box sx={{ minWidth: 100 }} >
          <FormControl className="pr-2 rounded-md " >
            <InputLabel id="sort-by" className="text-sm">Sort By</InputLabel>
            <Select
              label="sort-by"
              value={searchParams.get("sort") || "featured"}
              onChange={handleSortChange}
              sx={{ fontSize: '0.875rem' }}
            >
              <MenuItem value={"featured"}>Featured</MenuItem>
              <MenuItem value={"rating"}>Rating</MenuItem>
              <MenuItem value={"price_ascending"}>Price Ascending</MenuItem>
              <MenuItem value={"price_descending"}>Price Descending</MenuItem>
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

const loadSubcategory = async (subcategory: string) => {
  return fetchProducts(subcategory, "featured");
};

export async function loader({ params }: any) {
  const subcategory = params.subcategory;
  return defer({
    subcategoryData: await loadSubcategory(subcategory),
  });
}
