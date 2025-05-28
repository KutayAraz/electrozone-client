import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PriceRangeData } from "../types/filters";

interface UseFiltersProps {
  priceRangeData: PriceRangeData;
  brandsData: string[];
}

interface UseFiltersReturn {
  // State
  priceRange: [number, number];
  selectedBrands: string[];
  stockStatus: string;

  // Handlers
  handlePriceChange: (event: any, newValue: [number, number]) => void;
  handlePriceInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceBlur: () => void;
  handleStockChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBrandChange: (brand: string) => void;

  // Actions
  applyFilters: () => void;
  resetFilters: () => void;

  // Utility
  getFilterParams: () => {
    stockStatus?: string;
    minPriceQuery?: string;
    maxPriceQuery?: string;
    brandString?: string;
  };
}

export const useFilters = ({ priceRangeData, brandsData }: UseFiltersProps): UseFiltersReturn => {
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

  const getInitialStockStatus = () => {
    return searchParams.get("stock_status") || "";
  };

  const [priceRange, setPriceRange] = useState<[number, number]>([
    getInitialPriceMin(),
    getInitialPriceMax(),
  ]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(getInitialBrands());
  const [stockStatus, setStockStatus] = useState<string>(getInitialStockStatus());

  // Update state when URL params change (e.g., browser back/forward)
  useEffect(() => {
    setPriceRange([getInitialPriceMin(), getInitialPriceMax()]);
    setSelectedBrands(getInitialBrands());
    setStockStatus(getInitialStockStatus());
  }, [searchParams, priceRangeData]);

  // Price handlers
  const handlePriceChange = useCallback((event: any, newValue: [number, number]) => {
    setPriceRange(newValue);
  }, []);

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
    const minPrice = Number(priceRangeData.min) || 0;
    const maxPrice = Number(priceRangeData.max) || 1000;

    setPriceRange((prev) => {
      let [min, max] = prev;

      // Clamp values to valid range
      if (min < minPrice) min = minPrice;
      if (max > maxPrice) max = maxPrice;

      // Ensure min is less than max
      if (min > max) {
        [min, max] = [max, min];
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

  // Get filter params for API query
  const getFilterParams = useCallback(() => {
    const params: {
      stockStatus?: string;
      minPriceQuery?: string;
      maxPriceQuery?: string;
      brandString?: string;
    } = {};

    // Only include params that differ from defaults
    if (stockStatus) {
      params.stockStatus = stockStatus;
    }

    const minPrice = Number(priceRangeData.min) || 0;
    const maxPrice = Number(priceRangeData.max) || 1000;

    if (priceRange[0] > minPrice) {
      params.minPriceQuery = String(priceRange[0]);
    }

    if (priceRange[1] < maxPrice) {
      params.maxPriceQuery = String(priceRange[1]);
    }

    if (selectedBrands.length > 0) {
      params.brandString = selectedBrands.map(encodeURIComponent).join(" ");
    }

    return params;
  }, [stockStatus, priceRange, selectedBrands, priceRangeData]);

  // Apply filters - updates URL params which should trigger query refetch
  const applyFilters = useCallback(() => {
    const newSearchParams = new URLSearchParams();

    // Preserve existing sort param
    const currentSort = searchParams.get("sort") || "featured";
    newSearchParams.set("sort", currentSort);

    // Add filter params
    const minPrice = Number(priceRangeData.min) || 0;
    const maxPrice = Number(priceRangeData.max) || 1000;

    if (selectedBrands.length > 0) {
      const brandsString = selectedBrands.map(encodeURIComponent).join(" ");
      newSearchParams.set("brands", brandsString);
    }

    if (priceRange[0] > minPrice) {
      newSearchParams.set("min_price", String(priceRange[0]));
    }

    if (priceRange[1] < maxPrice) {
      newSearchParams.set("max_price", String(priceRange[1]));
    }

    if (stockStatus) {
      newSearchParams.set("stock_status", stockStatus);
    }

    // Update URL - this should trigger a refetch in the component using this hook
    setSearchParams(newSearchParams);
  }, [searchParams, selectedBrands, priceRange, stockStatus, priceRangeData, setSearchParams]);

  // Reset all filters
  const resetFilters = useCallback(() => {
    const minPrice = Number(priceRangeData.min) || 0;
    const maxPrice = Number(priceRangeData.max) || 1000;

    setPriceRange([minPrice, maxPrice]);
    setSelectedBrands([]);
    setStockStatus("");

    // Clear URL params except sort
    const newSearchParams = new URLSearchParams();
    const currentSort = searchParams.get("sort") || "featured";
    newSearchParams.set("sort", currentSort);
    setSearchParams(newSearchParams);
  }, [priceRangeData, searchParams, setSearchParams]);

  return {
    // State
    priceRange,
    selectedBrands,
    stockStatus,

    // Handlers
    handlePriceChange,
    handlePriceInputChange,
    handlePriceBlur,
    handleStockChange,
    handleBrandChange,

    // Actions
    applyFilters,
    resetFilters,

    // Utility
    getFilterParams,
  };
};
