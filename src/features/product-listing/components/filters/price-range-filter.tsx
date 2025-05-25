import { InputAdornment, Slider, TextField } from "@mui/material";

import { PriceRangeData } from "../../types/filters";

interface PriceRangeFilterProps {
  priceRange: [number, number];
  priceRangeData: PriceRangeData;
  handlePriceChange: (event: any, newValue: [number, number]) => void;
  handlePriceInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceBlur: () => void;
  compact?: boolean;
}

export const PriceRangeFilter = ({
  priceRange,
  priceRangeData,
  handlePriceChange,
  handlePriceInputChange,
  handlePriceBlur,
  compact = false,
}: PriceRangeFilterProps) => {
  // Convert string values to numbers
  const minPrice = Number(priceRangeData.min) || 0;
  const maxPrice = Number(priceRangeData.max) || 1000;

  const step = Math.floor((maxPrice - minPrice) / (compact ? 10 : 8));

  const handleSliderChange = (event: Event, value: number | number[]) => {
    // Ensure to have an array of two numbers
    if (Array.isArray(value) && value.length === 2) {
      handlePriceChange(event, value as [number, number]);
    }
  };

  return (
    <div>
      <h4 className={`${compact ? "text-base" : "text-lg"} font-semibold mb-2`}>Price Range</h4>
      <Slider
        getAriaLabel={() => "Price range"}
        value={priceRange}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        step={step}
        min={minPrice}
        max={maxPrice}
        getAriaValueText={(value) => `$${value}`}
        valueLabelFormat={(value) => `$${value}`}
        sx={{
          "& .MuiSlider-thumb": {
            color: "#13193F",
          },
          "& .MuiSlider-track": {
            color: "#13193F",
          },
          maxWidth: compact ? "95%" : "85%",
          mx: "auto",
          display: "flex",
        }}
      />

      <div className="mb-2 flex space-x-2">
        <div className={compact ? "flex-1" : ""}>
          <TextField
            fullWidth={compact}
            name="minPrice"
            value={priceRange[0]}
            onChange={handlePriceInputChange}
            onBlur={handlePriceBlur}
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      mr: "4px",
                      fontSize: "0.5rem",
                    }}
                  >
                    $
                  </InputAdornment>
                ),
                sx: {
                  ".MuiInputBase-input": {
                    fontSize: "0.875rem",
                  },
                },
              },
            }}
          />
        </div>
        <div className={compact ? "flex-1" : ""}>
          <TextField
            fullWidth={compact}
            name="maxPrice"
            value={priceRange[1]}
            onChange={handlePriceInputChange}
            onBlur={handlePriceBlur}
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      mr: "2px",
                      paddingX: "0px",
                      fontSize: "0.5rem",
                    }}
                  >
                    $
                  </InputAdornment>
                ),
                sx: {
                  ".MuiInputBase-input": {
                    fontSize: "0.875rem",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};
