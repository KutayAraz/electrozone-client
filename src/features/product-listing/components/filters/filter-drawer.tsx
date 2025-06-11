import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton } from "@mui/material";

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
      onClose={() => onClose()}
      sx={{
        "& .MuiDrawer-paper": { maxHeight: "80%", overflow: "auto" },
      }}
    >
      <IconButton
        onClick={() => onClose()}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <FilterPanel
        priceRangeData={priceRangeData}
        brandsData={brandsData}
        subcategoriesData={subcategoriesData}
        onFilterApply={onClose}
      />
    </Drawer>
  );
};
