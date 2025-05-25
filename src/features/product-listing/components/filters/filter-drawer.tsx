import CloseIcon from "@mui/icons-material/Close";
import { Drawer, IconButton } from "@mui/material";
import { useState } from "react";

import { PriceRangeData } from "../../types/filters";

import { FilterPanel } from "./filter-panel";

interface FilterDrawerProps {
  priceRangeData: PriceRangeData;
  brandsData: string[];
}

export const FilterDrawer = ({ priceRangeData, brandsData }: FilterDrawerProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      sx={{
        "& .MuiDrawer-paper": { maxHeight: "80%", overflow: "auto" },
      }}
    >
      <IconButton
        onClick={() => setIsOpen(false)}
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
        compact={true}
        onFilterApply={() => setIsOpen(false)}
      />
    </Drawer>
  );
};
