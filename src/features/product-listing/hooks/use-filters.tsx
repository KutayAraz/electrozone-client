import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PriceRangeData } from "../types/filters";

interface UseFiltersProps {
  priceRangeData: PriceRangeData;
}

interface UseFiltersReturn {
  // State
  priceRange: [number, number];
  selectedBrands: string[];
  selectedSubcategories: string[];
  stockStatus: string;

  // Handlers
  handlePriceChange: (event: Event | React.SyntheticEvent, newValue: [number, number]) => void;
  handlePriceInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceBlur: () => void;
  handleStockChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBrandChange: (brand: string) => void;
  handleSubcategoryChange: (subcategory: string) => void;

  // Actions
  applyFilters: () => void;
  resetFilters: () => void;

  // Utility
  getFilterParams: () => {
    stockStatus?: string;
    min_price?: string;
    max_price?: string;
    brandString?: string;
    subcategoriesString?: string;
  };
}

export const useFilters = ({ priceRangeData }: UseFiltersProps): UseFiltersReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse initial values from URL params
  const getInitialPriceMin = () => {
    const minParam = searchParams.get("min_price");
    return minParam ? parseFloat(minParam) : 0;
  };

  const getInitialPriceMax = () => {
    const maxParam = searchParams.get("max_price");
    const maxValue = parseFloat(priceRangeData.max);
    return maxParam ? parseFloat(maxParam) : maxValue;
  };

  const getInitialBrands = () => {
    const brandsParam = searchParams.get("brands");
    return brandsParam ? brandsParam.split(" ").map(decodeURIComponent) : [];
  };

  const getInitialSubcategories = () => {
    const subcategoriesParam = searchParams.get("subcategories");
    return subcategoriesParam ? subcategoriesParam.split(" ").map(decodeURIComponent) : [];
  };

  const getInitialStockStatus = () => {
    return searchParams.get("stock_status") || "";
  };

  const [priceRange, setPriceRange] = useState<[number, number]>([
    getInitialPriceMin(),
    getInitialPriceMax(),
  ]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(getInitialBrands());
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    getInitialSubcategories(),
  );
  const [stockStatus, setStockStatus] = useState<string>(getInitialStockStatus());

  // Update state when URL params change (e.g., browser back/forward)
  useEffect(() => {
    setPriceRange([getInitialPriceMin(), getInitialPriceMax()]);
    setSelectedBrands(getInitialBrands());
    setSelectedSubcategories(getInitialSubcategories());
    setStockStatus(getInitialStockStatus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, priceRangeData]);

  // Price handlers
  const handlePriceChange = useCallback(
    (event: Event | React.SyntheticEvent, newValue: [number, number]) => {
      // Ensure max is never less than min
      const [newMin, newMax] = newValue;
      if (newMax < newMin) {
        setPriceRange([newMin, newMin]);
      } else {
        setPriceRange(newValue);
      }
    },
    [],
  );

  const handlePriceInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      const numValue = value === "" ? 0 : Number(value);

      if (name === "minPrice") {
        setPriceRange([numValue, priceRange[1]]);
      } else if (name === "maxPrice") {
        setPriceRange([priceRange[0], numValue]);
      }
    },
    [priceRange],
  );

  const handlePriceBlur = useCallback(() => {
    const maxPrice = Number(priceRangeData.max) || 1000;

    setPriceRange((prev) => {
      let [min, max] = prev;

      // Ensure min is at least 0
      if (min < 0) min = 0;

      // Ensure max doesn't exceed the maximum possible price
      if (max > maxPrice) max = maxPrice;

      // Ensure min is less than or equal to max
      if (min > max) {
        max = min; // Set max to min instead of swapping
      }

      return [min, max];
    });
  }, [priceRangeData]);

  // Stock status handler
  const handleStockChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name } = event.target;

      if (name === "all") {
        setStockStatus(stockStatus === "all" ? "" : "all");
      } else if (name === "in_stock") {
        setStockStatus(stockStatus === "in_stock" ? "" : "in_stock");
      }
    },
    [stockStatus],
  );

  // Brand handler
  const handleBrandChange = useCallback((brand: string) => {
    setSelectedBrands((prev) => {
      if (prev.includes(brand)) {
        return prev.filter((b) => b !== brand);
      }
      return [...prev, brand];
    });
  }, []);

  // Subcategory handler
  const handleSubcategoryChange = useCallback((subcategory: string) => {
    setSelectedSubcategories((prev) => {
      if (prev.includes(subcategory)) {
        return prev.filter((s) => s !== subcategory);
      }
      return [...prev, subcategory];
    });
  }, []);

  // Get filter params for API query
  const getFilterParams = useCallback(() => {
    const params: {
      stockStatus?: string;
      min_price?: string;
      max_price?: string;
      brandString?: string;
      subcategoriesString?: string;
    } = {};

    // Only include params that differ from defaults
    if (stockStatus) {
      params.stockStatus = stockStatus;
    }

    const maxPrice = Number(priceRangeData.max) || 1000;

    // Only include min_price if it's greater than 0
    if (priceRange[0] > 0) {
      params.min_price = String(priceRange[0]);
    }

    // Only include max_price if it's less than the maximum
    if (priceRange[1] < maxPrice) {
      params.max_price = String(priceRange[1]);
    }

    if (selectedBrands.length > 0) {
      params.brandString = selectedBrands.map(encodeURIComponent).join(" ");
    }

    if (selectedSubcategories.length > 0) {
      params.subcategoriesString = selectedSubcategories.map(encodeURIComponent).join(" ");
    }

    return params;
  }, [stockStatus, priceRange, selectedBrands, selectedSubcategories, priceRangeData]);

  // Apply filters - updates URL params which should trigger query refetch
  const applyFilters = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    // Preserve existing sort param
    const currentSort = searchParams.get("sort") || "featured";
    newSearchParams.set("sort", currentSort);

    // Preserve search query if it exists
    const searchQuery = searchParams.get("query");
    if (searchQuery) {
      newSearchParams.set("query", searchQuery);
    }

    // Remove all filter params first
    newSearchParams.delete("brands");
    newSearchParams.delete("min_price");
    newSearchParams.delete("max_price");
    newSearchParams.delete("stock_status");
    newSearchParams.delete("subcategories");

    // Add filter params
    const maxPrice = Number(priceRangeData.max) || 1000;

    if (selectedBrands.length > 0) {
      const brandsString = selectedBrands.map(encodeURIComponent).join(" ");
      newSearchParams.set("brands", brandsString);
    }

    // Only include min_price if it's greater than 0
    if (priceRange[0] > 0) {
      newSearchParams.set("min_price", String(priceRange[0]));
    }

    // Only include max_price if it's less than the maximum
    if (priceRange[1] < maxPrice) {
      newSearchParams.set("max_price", String(priceRange[1]));
    }

    if (stockStatus) {
      newSearchParams.set("stock_status", stockStatus);
    }

    if (selectedSubcategories.length > 0) {
      const subcategoriesString = selectedSubcategories.map(encodeURIComponent).join(" ");
      newSearchParams.set("subcategories", subcategoriesString);
    }

    // Update URL - this will trigger a refetch in the component using this hook
    setSearchParams(newSearchParams);
  }, [
    searchParams,
    selectedBrands,
    selectedSubcategories,
    priceRange,
    stockStatus,
    priceRangeData,
    setSearchParams,
  ]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    const maxPrice = Number(priceRangeData.max) || 1000;

    setPriceRange([0, maxPrice]); // Always reset min to 0
    setSelectedBrands([]);
    setSelectedSubcategories([]);
    setStockStatus("");

    // Clear URL params except sort and search query
    const newSearchParams = new URLSearchParams();
    const currentSort = searchParams.get("sort") || "featured";
    newSearchParams.set("sort", currentSort);

    const searchQuery = searchParams.get("query");
    if (searchQuery) {
      newSearchParams.set("query", searchQuery);
    }

    setSearchParams(newSearchParams);
  }, [priceRangeData, searchParams, setSearchParams]);

  return {
    // State
    priceRange,
    selectedBrands,
    selectedSubcategories,
    stockStatus,

    // Handlers
    handlePriceChange,
    handlePriceInputChange,
    handlePriceBlur,
    handleStockChange,
    handleBrandChange,
    handleSubcategoryChange,

    // Actions
    applyFilters,
    resetFilters,

    // Utility
    getFilterParams,
  };
};
