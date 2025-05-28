import { createApi } from "@reduxjs/toolkit/query/react";

import { refreshAuth } from "./refresh-auth";

// Create the base API with empty endpoints for endpoint injecting
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: refreshAuth,
  endpoints: () => ({}),
  tagTypes: [
    "User",
    "Product",
    "UserCart",
    "UserCartCount",
    "SessionCart",
    "SessionCartCount",
    "BuyNowCart",
    "Review",
    "Wishlist",
    "Order",
    "Subcategory",
    "Category",
    "ProductList",
  ],
});
