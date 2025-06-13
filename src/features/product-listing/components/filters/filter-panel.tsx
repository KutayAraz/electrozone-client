import { Button, Divider } from "@mui/material";

import { useFilters } from "../../hooks/use-filters";
import { PriceRangeData } from "../../types/filters";

import { BrandsFilter } from "./brands-filter";
import { PriceRangeFilter } from "./price-range-filter";
import { StockStatusFilter } from "./stock-status-filter";
import { SubcategoriesFilter } from "./subcategories-filter";

interface FilterPanelProps {
  priceRangeData: PriceRangeData;
  brandsData: string[];
  subcategoriesData?: string[]; // Optional for pages that don't need it
  onFilterApply?: () => void; // Optional callback for mobile views
}

export const FilterPanel = ({
  priceRangeData,
  brandsData,
  subcategoriesData,
  onFilterApply,
}: FilterPanelProps) => {
  const {
    priceRange,
    selectedBrands,
    selectedSubcategories,
    stockStatus,
    handlePriceChange,
    handlePriceInputChange,
    handlePriceBlur,
    handleStockChange,
    handleBrandChange,
    handleSubcategoryChange,
    applyFilters,
    resetFilters,
  } = useFilters({ priceRangeData });

  const handleApplyFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    applyFilters();
    if (onFilterApply) onFilterApply();
  };

  return (
    <div className="p-4">
      <StockStatusFilter stockStatus={stockStatus} handleStockChange={handleStockChange} />

      {/* Only show subcategories filter if data is provided */}
      {subcategoriesData && subcategoriesData.length > 0 && (
        <>
          <SubcategoriesFilter
            subcategoriesData={subcategoriesData}
            selectedSubcategories={selectedSubcategories}
            handleSubcategoryChange={handleSubcategoryChange}
          />
          <Divider sx={{ marginY: "5px", marginRight: "8px" }} />
        </>
      )}

      <BrandsFilter
        brandsData={brandsData}
        selectedBrands={selectedBrands}
        handleBrandChange={handleBrandChange}
      />

      <Divider sx={{ marginY: "5px", marginRight: "8px" }} />

      <PriceRangeFilter
        priceRange={priceRange}
        priceRangeData={priceRangeData}
        handlePriceChange={handlePriceChange}
        handlePriceInputChange={handlePriceInputChange}
        handlePriceBlur={handlePriceBlur}
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

        <Button variant="outlined" onClick={resetFilters} fullWidth sx={{ mt: 1 }}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
};
