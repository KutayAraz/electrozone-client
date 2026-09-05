import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { PriceRangeData } from "../types/filters";

interface UseFiltersProps {
  priceRangeData: PriceRangeData;
}

interface AppliedFilters {
  priceRange: [number, number];
  selectedBrands: string[];
  selectedSubcategories: string[];
  stockStatus: string;
}

interface UseFiltersReturn extends AppliedFilters {
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

const parseList = (value: string | null) => (value ? value.split(" ").map(decodeURIComponent) : []);

export const useFilters = ({ priceRangeData }: UseFiltersProps): UseFiltersReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const maxPrice = Number(priceRangeData.max) || 1000;

  /**
   * The filters actually in effect. Derived from the URL during render rather
   * than mirrored into state, so they change atomically with navigation - a
   * copy held in state lags one render behind and briefly pairs the new
   * subcategory with the previous one's filters, which produces a bogus extra
   * request and cache entry.
   */
  const applied = useMemo<AppliedFilters>(() => {
    const min = searchParams.get("min_price");
    const max = searchParams.get("max_price");

    return {
      priceRange: [min ? parseFloat(min) : 0, max ? parseFloat(max) : maxPrice],
      selectedBrands: parseList(searchParams.get("brands")),
      selectedSubcategories: parseList(searchParams.get("subcategories")),
      stockStatus: searchParams.get("stock_status") || "",
    };
  }, [searchParams, maxPrice]);

  // What the filter panel shows while the user edits, before they hit Apply.
  const [draft, setDraft] = useState<AppliedFilters>(applied);
  const [appliedSeed, setAppliedSeed] = useState(applied);

  // Re-seed the draft whenever the applied filters change - navigation,
  // back/forward, or a reset.
  if (appliedSeed !== applied) {
    setAppliedSeed(applied);
    setDraft(applied);
  }

  // Price handlers
  const handlePriceChange = useCallback(
    (event: Event | React.SyntheticEvent, newValue: [number, number]) => {
      const [newMin, newMax] = newValue;

      setDraft((prev) => ({
        ...prev,
        priceRange: newMax < newMin ? [newMin, newMin] : newValue,
      }));
    },
    [],
  );

  const handlePriceInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const numValue = value === "" ? 0 : Number(value);

    setDraft((prev) => ({
      ...prev,
      priceRange:
        name === "minPrice"
          ? [numValue, prev.priceRange[1]]
          : name === "maxPrice"
            ? [prev.priceRange[0], numValue]
            : prev.priceRange,
    }));
  }, []);

  const handlePriceBlur = useCallback(() => {
    setDraft((prev) => {
      let [min, max] = prev.priceRange;

      if (min < 0) min = 0;
      if (max > maxPrice) max = maxPrice;
      if (min > max) max = min; // Set max to min instead of swapping

      return { ...prev, priceRange: [min, max] };
    });
  }, [maxPrice]);

  // Stock status handler
  const handleStockChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setDraft((prev) => ({
      ...prev,
      stockStatus: prev.stockStatus === name ? "" : name,
    }));
  }, []);

  // Brand handler
  const handleBrandChange = useCallback((brand: string) => {
    setDraft((prev) => ({
      ...prev,
      selectedBrands: prev.selectedBrands.includes(brand)
        ? prev.selectedBrands.filter((b) => b !== brand)
        : [...prev.selectedBrands, brand],
    }));
  }, []);

  // Subcategory handler
  const handleSubcategoryChange = useCallback((subcategory: string) => {
    setDraft((prev) => ({
      ...prev,
      selectedSubcategories: prev.selectedSubcategories.includes(subcategory)
        ? prev.selectedSubcategories.filter((s) => s !== subcategory)
        : [...prev.selectedSubcategories, subcategory],
    }));
  }, []);

  /**
   * Query params for the API. Built from the applied filters, never the draft,
   * so moving a slider does not refetch until Apply is pressed.
   */
  const getFilterParams = useCallback(() => {
    const params: ReturnType<UseFiltersReturn["getFilterParams"]> = {};

    if (applied.stockStatus) params.stockStatus = applied.stockStatus;

    // Only include bounds that actually narrow the range
    if (applied.priceRange[0] > 0) params.min_price = String(applied.priceRange[0]);
    if (applied.priceRange[1] < maxPrice) params.max_price = String(applied.priceRange[1]);

    if (applied.selectedBrands.length > 0) {
      params.brandString = applied.selectedBrands.map(encodeURIComponent).join(" ");
    }

    if (applied.selectedSubcategories.length > 0) {
      params.subcategoriesString = applied.selectedSubcategories.map(encodeURIComponent).join(" ");
    }

    return params;
  }, [applied, maxPrice]);

  // Commit the draft to the URL, which is what drives the query
  const applyFilters = useCallback(() => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set("sort", searchParams.get("sort") || "featured");

    // Rewrite the filter params from scratch
    for (const key of ["brands", "min_price", "max_price", "stock_status", "subcategories"]) {
      newSearchParams.delete(key);
    }

    if (draft.selectedBrands.length > 0) {
      newSearchParams.set("brands", draft.selectedBrands.map(encodeURIComponent).join(" "));
    }

    if (draft.priceRange[0] > 0) newSearchParams.set("min_price", String(draft.priceRange[0]));
    if (draft.priceRange[1] < maxPrice) {
      newSearchParams.set("max_price", String(draft.priceRange[1]));
    }

    if (draft.stockStatus) newSearchParams.set("stock_status", draft.stockStatus);

    if (draft.selectedSubcategories.length > 0) {
      newSearchParams.set(
        "subcategories",
        draft.selectedSubcategories.map(encodeURIComponent).join(" "),
      );
    }

    setSearchParams(newSearchParams);
  }, [searchParams, draft, maxPrice, setSearchParams]);

  // Clear every filter, keeping sort and any search query
  const resetFilters = useCallback(() => {
    const newSearchParams = new URLSearchParams();

    newSearchParams.set("sort", searchParams.get("sort") || "featured");

    const searchQuery = searchParams.get("query");
    if (searchQuery) newSearchParams.set("query", searchQuery);

    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams]);

  return {
    ...draft,

    handlePriceChange,
    handlePriceInputChange,
    handlePriceBlur,
    handleStockChange,
    handleBrandChange,
    handleSubcategoryChange,

    applyFilters,
    resetFilters,

    getFilterParams,
  };
};
