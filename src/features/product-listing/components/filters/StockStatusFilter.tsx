import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

import { FilterHeading, FilterOptionLabel, filterControlSx, filterRowSx } from "./FilterOption";

interface StockStatusFilterProps {
  stockStatus: string;
  handleStockChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const STOCK_OPTIONS = [
  { value: "all", label: "All products" },
  { value: "in_stock", label: "In stock only" },
];

export const StockStatusFilter = ({ stockStatus, handleStockChange }: StockStatusFilterProps) => {
  // Older URLs may carry stock_status=all, which means the same as no filter
  const selectedValue = stockStatus === "in_stock" ? "in_stock" : "all";

  return (
    <div>
      <FilterHeading id="stock-status-label">Stock Status</FilterHeading>

      <RadioGroup
        aria-labelledby="stock-status-label"
        name="stock-status"
        value={selectedValue}
        onChange={handleStockChange}
        sx={{ gap: { xs: "4px", sm: "0" } }}
      >
        {STOCK_OPTIONS.map(({ value, label }) => {
          const isSelected = selectedValue === value;

          return (
            <FormControlLabel
              key={value}
              value={value}
              control={<Radio sx={filterControlSx("50%")} />}
              label={<FilterOptionLabel isSelected={isSelected}>{label}</FilterOptionLabel>}
              sx={filterRowSx(isSelected)}
            />
          );
        })}
      </RadioGroup>
    </div>
  );
};
