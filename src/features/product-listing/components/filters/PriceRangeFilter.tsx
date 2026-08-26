import { InputAdornment, Slider, TextField } from "@mui/material";

import { PriceRangeData } from "../../types/filters";

interface PriceRangeFilterProps {
  priceRange: [number, number];
  priceRangeData: PriceRangeData;
  handlePriceChange: (event: Event | React.SyntheticEvent, newValue: [number, number]) => void;
  handlePriceInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceBlur: () => void;
}

export const PriceRangeFilter = ({
  priceRange,
  priceRangeData,
  handlePriceChange,
  handlePriceInputChange,
  handlePriceBlur,
}: PriceRangeFilterProps) => {
  // Always use 0 as minimum, get maximum from data
  const minPrice = 0;
  const maxPrice = Number(priceRangeData.max) || 1000;

  const step = Math.floor(maxPrice / 10);

  const handleSliderChange = (event: Event, value: number | number[]) => {
    // Ensure to have an array of two numbers
    if (Array.isArray(value) && value.length === 2) {
      handlePriceChange(event, value as [number, number]);
    }
  };

  return (
    <div>
      <h4 className="text-lg sm:text-[16px] font-semibold text-gray-900 mb-3">Price Range</h4>

      <div className="px-6">
        <Slider
          getAriaLabel={() => "Price range"}
          value={priceRange}
          onChange={handleSliderChange}
          valueLabelDisplay="off"
          step={step}
          min={minPrice}
          max={maxPrice}
          getAriaValueText={(value) => `${value}`}
          sx={{
            "& .MuiSlider-thumb": {
              color: "#13193F",
              width: { xs: "24px", sm: "20px" },
              height: { xs: "24px", sm: "20px" },
            },
            "& .MuiSlider-track": {
              color: "#13193F",
              height: { xs: "6px", sm: "4px" },
            },
            "& .MuiSlider-rail": {
              color: "#f3f4f6", // Fixed color value
              height: { xs: "6px", sm: "4px" },
            },
            width: "100%", // Use full width of the padded container
            mb: { xs: 2, sm: 1 },
          }}
        />
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <TextField
            fullWidth
            name="minPrice"
            value={priceRange[0]}
            onChange={handlePriceInputChange}
            onBlur={handlePriceBlur}
            size="small"
            type="number"
            placeholder="Min"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#f9fafb",
                minHeight: { xs: "44px", sm: "auto" }, // Touch-friendly height on mobile
                "&:hover fieldset": {
                  borderColor: "#13193F",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#13193F",
                },
              },
            }}
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
                      fontSize: { xs: "1rem", sm: "0.875rem" },
                      color: "#6b7280",
                    }}
                  >
                    $
                  </InputAdornment>
                ),
                sx: {
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "1rem", md: "0.875rem" },
                    padding: { xs: "12px 6px", md: "6px" },
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
            placeholder="Max"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#f9fafb",
                minHeight: { xs: "44px", sm: "auto" }, // Touch-friendly height on mobile
                "&:hover fieldset": {
                  borderColor: "#13193F",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#13193F",
                },
              },
            }}
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
                      mr: "4px",
                      fontSize: { xs: "1rem", sm: "0.875rem" },
                      color: "#6b7280",
                    }}
                  >
                    $
                  </InputAdornment>
                ),
                sx: {
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "1rem", md: "0.875rem" },
                    padding: { xs: "12px 6px", md: "6px" },
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
