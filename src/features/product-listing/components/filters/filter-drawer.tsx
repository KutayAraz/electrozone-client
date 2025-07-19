import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton, Typography } from "@mui/material";

import { PriceRangeData } from "../../types/filters";

import { FilterPanel } from "./filter-panel";

interface FilterDrawerProps {
  priceRangeData: PriceRangeData;
  brandsData: string[];
  subcategoriesData?: string[];
  isOpen: boolean;
  onClose: () => void;
}

export const FilterDrawer = ({
  priceRangeData,
  brandsData,
  subcategoriesData,
  isOpen,
  onClose,
}: FilterDrawerProps) => {
  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          maxHeight: "85vh",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <Typography variant="h6" className="font-semibold text-gray-900">
          Filters
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          aria-label="Close filters"
          className="text-gray-500 hover:text-gray-700"
        >
          <CloseIcon />
        </IconButton>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <FilterPanel
          priceRangeData={priceRangeData}
          brandsData={brandsData}
          subcategoriesData={subcategoriesData}
          onFilterApply={onClose}
        />
      </div>
    </Drawer>
  );
};
