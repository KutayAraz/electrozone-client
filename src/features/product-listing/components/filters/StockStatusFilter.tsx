import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";

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
      <h4
        id="stock-status-label"
        className="text-lg sm:text-[16px] font-semibold text-gray-900 mb-1"
      >
        Stock Status
      </h4>

      <RadioGroup
        aria-labelledby="stock-status-label"
        name="stock-status"
        value={selectedValue}
        onChange={handleStockChange}
        sx={{ gap: { xs: "8px", sm: "0" } }}
      >
        {STOCK_OPTIONS.map(({ value, label }) => {
          const isSelected = selectedValue === value;

          return (
            <FormControlLabel
              key={value}
              value={value}
              control={
                <Radio
                  sx={{
                    padding: { xs: "8px", sm: "4px" },
                    color: "#9ca3af",
                    "&.Mui-checked": {
                      color: "#13193F",
                    },
                    "&:hover .MuiSvgIcon-root": {
                      backgroundColor: "rgba(19, 25, 63, 0.04)",
                      borderRadius: "50%",
                    },
                    "& .MuiSvgIcon-root": {
                      fontSize: { xs: "1.3rem", sm: "1.1rem" },
                      transition: "background-color 0.2s ease",
                    },
                  }}
                />
              }
              label={
                <span
                  className={`
                    text-base sm:text-sm select-none
                    ${isSelected ? "font-semibold text-gray-900" : "font-medium text-gray-700"}
                    transition-all duration-200
                  `}
                >
                  {label}
                </span>
              }
              sx={{
                margin: 0,
                paddingY: { xs: "8px", sm: "2px" },
                paddingX: { xs: "12px", sm: "0" },
                borderRadius: "8px",
                backgroundColor: isSelected ? "#f0f1f7" : "white",
                transition: "all 0.2s",
                width: { xs: "100%", sm: "auto" },
                minHeight: { xs: "48px", sm: "auto" }, // Touch-friendly height on mobile
                border: { xs: "1px solid #e5e7eb", sm: "none" }, // Better visual separation on mobile
                "&:hover": {
                  backgroundColor: isSelected ? "#f0f1f7" : "#f9fafb",
                },
              }}
            />
          );
        })}
      </RadioGroup>
    </div>
  );
};
