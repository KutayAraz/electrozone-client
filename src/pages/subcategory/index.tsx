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

const fetchProducts = async (subcategory: string, sort: string) => {
  const response = await fetch(
    `${import.meta.env.API_URL}/subcategories/${subcategory}/${sort}`
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
    <div>
      <h1>Products</h1>
      <select
        onChange={handleSortChange}
        value={searchParams.get("sort") || "featured"}
      >
        <option value="featured">Featured</option>
        <option value="rating">Rating</option>
        <option value="price_ascending">Price Ascending</option>
        <option value="price_descending">Price Descending</option>
      </select>
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
