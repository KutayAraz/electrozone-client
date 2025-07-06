import { InputAdornment, Slider, TextField } from "@mui/material";

import { PriceRangeData } from "../../types/filters";

interface PriceRangeFilterProps {
  priceRange: [number, number];
  priceRangeData: PriceRangeData;
  handlePriceChange: (event: Event | React.SyntheticEvent, newValue: [number, number]) => void;
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
  // Always use 0 as minimum, get maximum from data
  const minPrice = 0;
  const maxPrice = Number(priceRangeData.max) || 1000;

  const step = Math.floor(maxPrice / (compact ? 10 : 8));

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
        <div className="flex-1">
          <TextField
            fullWidth
            name="minPrice"
            value={priceRange[0]}
            onChange={handlePriceInputChange}
            onBlur={handlePriceBlur}
            size="small"
            type="number"
            slotProps={{
              htmlInput: {
                min: 0,
                max: priceRange[1], // Prevent min from exceeding current max
              },
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
        <div className="flex-1">
          <TextField
            fullWidth
            name="maxPrice"
            value={priceRange[1]}
            onChange={handlePriceInputChange}
            onBlur={handlePriceBlur}
            size="small"
            type="number"
            slotProps={{
              htmlInput: {
                min: priceRange[0], // Prevent max from going below current min
                max: maxPrice,
              },
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
