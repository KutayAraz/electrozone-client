import { Button, Divider } from "@mui/material";

import { useFilters } from "../../hooks/use-filters";
import { PriceRangeData } from "../../types/filters";

import { BrandsFilter } from "./brands-filter";
import { PriceRangeFilter } from "./price-range-filter";
import { StockStatusFilter } from "./stock-status-filter";

interface FilterPanelProps {
  priceRangeData: PriceRangeData;
  brandsData: string[];
  compact?: boolean; // For mobile/drawer view
  onFilterApply?: () => void; // Optional callback for mobile views
}

export const FilterPanel = ({
  priceRangeData,
  brandsData,
  compact = false,
  onFilterApply,
}: FilterPanelProps) => {
  const {
    priceRange,
    selectedBrands,
    stockStatus,
    handlePriceChange,
    handlePriceInputChange,
    handlePriceBlur,
    handleStockChange,
    handleBrandChange,
    applyFilters,
    resetFilters,
  } = useFilters({ priceRangeData, brandsData });

  const handleApplyFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    applyFilters();
    if (onFilterApply) onFilterApply();
  };

  return (
    <div className={compact ? "p-6 pb-3" : ""}>
      <StockStatusFilter
        stockStatus={stockStatus}
        handleStockChange={handleStockChange}
        compact={compact}
      />

      {!compact && <Divider sx={{ marginY: "5px", marginRight: "8px" }} />}

      <BrandsFilter
        brandsData={brandsData}
        selectedBrands={selectedBrands}
        handleBrandChange={handleBrandChange}
        compact={compact}
      />

      {!compact && <Divider sx={{ marginY: "5px", marginRight: "8px" }} />}

      <PriceRangeFilter
        priceRange={priceRange}
        priceRangeData={priceRangeData}
        handlePriceChange={handlePriceChange}
        handlePriceInputChange={handlePriceInputChange}
        handlePriceBlur={handlePriceBlur}
        compact={compact}
      />

      <div className="mt-2">
        <Button
          type="submit"
          variant="contained"
          onClick={handleApplyFilters}
          fullWidth
          sx={{
            backgroundColor: "#13193F",
            "&:hover": {
              backgroundColor: "#1e40af",
            },
          }}
        >
          FILTER
        </Button>

        {compact && (
          <Button variant="outlined" onClick={resetFilters} fullWidth sx={{ mt: 1 }}>
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
};
