import { SelectChangeEvent } from "@mui/material/Select";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export type SortMethod = "featured" | "rating" | "price_ascending" | "price_descending";

interface UseSortingReturn {
  currentSortMethod: SortMethod;
  handleSortChange: (valueOrEvent: SortMethod | SelectChangeEvent<SortMethod>) => void;
}

export const useSorting = (): UseSortingReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get current sort method from URL or default to "featured"
  const currentSortMethod = (searchParams.get("sort") || "featured") as SortMethod;

  const handleSortChange = useCallback(
    (valueOrEvent: SortMethod | SelectChangeEvent<SortMethod>) => {
      let newSortMethod: SortMethod;

      // Check if the argument is an event or a direct value
      if (typeof valueOrEvent === "string") {
        // Direct string value from MenuItem onClick
        newSortMethod = valueOrEvent as SortMethod;
      } else {
        // Extract value from event object (from Select onChange)
        newSortMethod = valueOrEvent.target.value as SortMethod;
      }

      // Get current search parameters
      const currentParams = new URLSearchParams(searchParams.toString());

      // Update the sort parameter
      currentParams.set("sort", newSortMethod);

      // Update the URL
      setSearchParams(currentParams);
    },
    [searchParams, setSearchParams],
  );

  return {
    currentSortMethod,
    handleSortChange,
  };
};
