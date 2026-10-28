import { Button, Divider } from "@mui/material";

import { useFilters } from "../../hooks/useFilters";
import { PriceRangeData } from "../../types/filters";

import { BrandsFilter } from "./BrandsFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { StockStatusFilter } from "./StockStatusFilter";
import { SubcategoriesFilter } from "./SubcategoriesFilter";

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
    <div className="flex flex-col h-full">
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1">
          <StockStatusFilter stockStatus={stockStatus} handleStockChange={handleStockChange} />

          <Divider sx={{ marginY: "8px" }} />

          {/* Only show subcategories filter if data is provided */}
          {subcategoriesData && subcategoriesData.length > 0 && (
            <>
              <SubcategoriesFilter
                subcategoriesData={subcategoriesData}
                selectedSubcategories={selectedSubcategories}
                handleSubcategoryChange={handleSubcategoryChange}
              />
              <Divider sx={{ marginY: "8px" }} />
            </>
          )}

          <BrandsFilter
            brandsData={brandsData}
            selectedBrands={selectedBrands}
            handleBrandChange={handleBrandChange}
          />

          <Divider sx={{ marginY: "8px" }} />

          <PriceRangeFilter
            priceRange={priceRange}
            priceRangeData={priceRangeData}
            handlePriceChange={handlePriceChange}
            handlePriceInputChange={handlePriceInputChange}
            handlePriceBlur={handlePriceBlur}
          />
        </div>

        <div className="h-4 sm:hidden"></div>
      </div>

      {/* Fixed bottom button area */}
      {/* Side by side in the mobile drawer to leave more room for the filters; stacked in the narrow sidebar */}
      <div className="sticky bottom-0 mt-2 flex gap-2 bg-white pb-2 pt-3 sm:flex-col">
        <Button
          variant="outlined"
          onClick={resetFilters}
          fullWidth
          sx={{
            minHeight: { xs: "44px", sm: "36px" }, // Touch-friendly height on mobile
            fontSize: { xs: "1rem", sm: "0.875rem" },
          }}
        >
          Reset Filters
        </Button>

        <Button
          type="submit"
          variant="contained"
          onClick={handleApplyFilters}
          fullWidth
          sx={{
            backgroundColor: "#13193F",
            minHeight: { xs: "44px", sm: "36px" },
            fontSize: { xs: "1rem", sm: "0.875rem" },
            fontWeight: { xs: "600", sm: "500" },
            "&:hover": {
              backgroundColor: "#283174",
            },
          }}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};
