import { Box, Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

interface StockStatusFilterProps {
  stockStatus: string;
  handleStockChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const StockStatusFilter = ({ stockStatus, handleStockChange }: StockStatusFilterProps) => {
  return (
    <div role="group" aria-labelledby="stock-status-label">
      <h4
        id="stock-status-label"
        className="text-lg sm:text-[16px] font-semibold text-gray-900 mb-1"
      >
        Stock Status
      </h4>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column" },
          gap: { xs: "8px", sm: "0" },
          maxHeight: "300px",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "0",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c1",
            borderRadius: "3px",
            "&:hover": {
              backgroundColor: "#a8a8a8",
            },
          },
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              sx={{
                padding: { xs: "8px", sm: "4px" },
                color: "#9ca3af",
                "&.Mui-checked": {
                  color: "#13193F",
                },
                "&:hover .MuiSvgIcon-root": {
                  backgroundColor: "rgba(19, 25, 63, 0.04)",
                  borderRadius: "4px",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: { xs: "1.3rem", sm: "1.1rem" },
                  transition: "background-color 0.2s ease",
                },
              }}
              checked={stockStatus === "in_stock"}
              onChange={handleStockChange}
              name="in_stock"
              slotProps={{
                input: {
                  "aria-label": "Only show in stock products",
                },
              }}
            />
          }
          label={
            <span
              className={`
                text-base sm:text-sm select-none
                ${
                  stockStatus === "in_stock"
                    ? "font-semibold text-gray-900"
                    : "font-medium text-gray-700"
                }
                transition-all duration-200
              `}
            >
              Only In Stock
            </span>
          }
          sx={{
            margin: 0,
            paddingY: { xs: "8px", sm: "2px" },
            paddingX: { xs: "12px", sm: "0" },
            borderRadius: "8px",
            backgroundColor: stockStatus === "in_stock" ? "#f0f1f7" : "white",
            transition: "all 0.2s",
            width: { xs: "100%", sm: "auto" },
            minHeight: { xs: "48px", sm: "auto" },
            border: { xs: "1px solid #e5e7eb", sm: "none" },
            "&:hover": {
              backgroundColor: stockStatus === "in_stock" ? "#f0f1f7" : "#f9fafb",
            },
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              sx={{
                padding: { xs: "8px", sm: "4px" },
                color: "#9ca3af",
                "&.Mui-checked": {
                  color: "#13193F",
                },
                "&:hover .MuiSvgIcon-root": {
                  backgroundColor: "rgba(19, 25, 63, 0.04)",
                  borderRadius: "4px",
                },
                "& .MuiSvgIcon-root": {
                  fontSize: { xs: "1.3rem", sm: "1.1rem" },
                  transition: "background-color 0.2s ease",
                },
              }}
              checked={stockStatus === "all"}
              onChange={handleStockChange}
              name="all"
              slotProps={{
                input: {
                  "aria-label": "Include all products",
                },
              }}
            />
          }
          label={
            <span
              className={`
                text-base sm:text-sm select-none
                ${
                  stockStatus === "all"
                    ? "font-semibold text-gray-900"
                    : "font-medium text-gray-700"
                }
                transition-all duration-200
              `}
            >
              Include All
            </span>
          }
          sx={{
            margin: 0,
            paddingY: { xs: "8px", sm: "2px" },
            paddingX: { xs: "12px", sm: "0" },
            borderRadius: "8px",
            backgroundColor: stockStatus === "all" ? "#f0f1f7" : "white",
            transition: "all 0.2s",
            width: { xs: "100%", sm: "auto" },
            minHeight: { xs: "48px", sm: "auto" }, // Touch-friendly height on mobile
            border: { xs: "1px solid #e5e7eb", sm: "none" }, // Better visual separation on mobile
            "&:hover": {
              backgroundColor: stockStatus === "all" ? "#f0f1f7" : "#f9fafb",
            },
          }}
        />
      </Box>
    </div>
  );
};
