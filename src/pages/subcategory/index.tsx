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

export async function fetchFeaturedProducts(subcategory: string) {
  const response = await fetch(
    `http://localhost:3000/subcategories/${subcategory}/featured`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch data");
}

export async function fetchProductsSortedByRating(subcategory: string) {
  const response = await fetch(
    `http://localhost:3000/subcategories/${subcategory}/rating`
  );
  if (response.ok) {
    return response.json();
  }
  throw new Error("Failed to fetch data");
}

export async function fetchProductsSortedByAscendingPrice(subcategory: string) {
  const response = await fetch(
    `http://localhost:3000/subcategories/${subcategory}/price_ascending`
  );
  if (response.status === 200) {
    return response.json();
  }
  throw new Error("Failed to fetch data");
}

export async function fetchProductsSortedByDescendingPrice(
  subcategory: string
) {
  const response = await fetch(
    `http://localhost:3000/subcategories/${subcategory}/price_descending`
  );
  if (response.status === 200) {
    return response.json();
  }
  throw new Error("Failed to fetch data");
}

const SubcategoryPage = () => {
  const { subcategoryData }: any = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const { subcategory }: any = useParams();
  const [productsData, setProducts] = useState(subcategoryData);

  console.log(subcategory)

  useEffect(() => {
    const sortMethod = searchParams.get("sort");

    const fetchData = async () => {
      let data;
      switch (sortMethod) {
        case "rating":
          console.log("subcate", subcategory)
          data = await fetchProductsSortedByRating(subcategory);
          break;
        case "price_ascending":
          data = await fetchProductsSortedByAscendingPrice(subcategory);
          break;
        case "price_descending":
          data = await fetchProductsSortedByDescendingPrice(subcategory);
          break;
        default:
          data = await fetchFeaturedProducts(subcategory);
      }

      setProducts(data);
    };

    fetchData().catch((error) => console.error(error));
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
        <><ProductList products={productsData} /></>
      </Suspense>
    </div>
  );
};

export default SubcategoryPage;

async function loadSubcategory(subcategory: string) {
  const response = await fetch(
    `http://localhost:3000/subcategories/${subcategory}/featured`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  console.log(response);
  if (response.status === 200) {
    return await response.json();
  }
}

export async function loader({ params }: any) {
  const subcategory = params.subcategory;
  return defer({
    subcategoryData: await loadSubcategory(subcategory),
  });
}
