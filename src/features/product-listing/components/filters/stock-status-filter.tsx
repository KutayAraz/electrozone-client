import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

interface StockStatusFilterProps {
  stockStatus: string;
  handleStockChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  compact?: boolean;
}

export const StockStatusFilter: React.FC<StockStatusFilterProps> = ({
  stockStatus,
  handleStockChange,
  compact = false,
}) => {
  return (
    <div>
      <h4 className={`${compact ? "text-base" : "text-lg"} font-semibold mb-1`}>Stock Status</h4>
      <div className={compact ? "grid grid-cols-2" : ""}>
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: compact ? "1rem" : "1.1rem",
                },
                "&.MuiButtonBase-root": {
                  paddingLeft: "10px",
                  paddingRight: "6px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                },
              }}
              checked={stockStatus === "all"}
              onChange={handleStockChange}
              name="all"
            />
          }
          label="Include All"
        />
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                "& .MuiSvgIcon-root": {
                  fontSize: compact ? "1rem" : "1.1rem",
                },
                "&.MuiButtonBase-root": {
                  paddingLeft: "10px",
                  paddingRight: "6px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                },
              }}
              checked={stockStatus === "in_stock"}
              onChange={handleStockChange}
              name="in_stock"
            />
          }
          label="Only in Stock"
          className="text-sm"
        />
      </div>
    </div>
  );
};
