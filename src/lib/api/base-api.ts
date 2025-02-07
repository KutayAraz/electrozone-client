import { createApi } from "@reduxjs/toolkit/query/react";

import { withAuthRefresh } from "./with-auth-refresh";

// Create the base API with empty endpoints for endpoint injecting
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: withAuthRefresh,
  endpoints: () => ({}),
  tagTypes: ["User", "Product", "Cart", "Review", "Wishlist", "Order", "Subcategory", "Category"],
});
