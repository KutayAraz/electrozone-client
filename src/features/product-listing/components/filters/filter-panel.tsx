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
    <div className="flex flex-col h-full">
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-1">
          <StockStatusFilter stockStatus={stockStatus} handleStockChange={handleStockChange} />
          <Divider sx={{ marginY: "5px", marginRight: "8px" }} />

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
        </div>

        <div className="h-4 sm:hidden"></div>
      </div>

      {/* Fixed bottom button area */}
      <div className="sticky bottom-0 bg-white pt-3 pb-2 mt-2">
        <div className="space-y-2">
          <div>
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
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              onClick={handleApplyFilters}
              fullWidth
              sx={{
                backgroundColor: "#13193F",
                minHeight: { xs: "48px", sm: "36px" },
                fontSize: { xs: "1rem", sm: "0.875rem" },
                fontWeight: { xs: "600", sm: "500" },
                "&:hover": {
                  backgroundColor: "#1e40af",
                },
              }}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
