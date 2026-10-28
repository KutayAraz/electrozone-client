import { InputAdornment, Slider, TextField } from "@mui/material";

import { PriceRangeData } from "../../types/filters";

import { FilterHeading } from "./FilterOption";

interface PriceRangeFilterProps {
  priceRange: [number, number];
  priceRangeData: PriceRangeData;
  handlePriceChange: (event: Event | React.SyntheticEvent, newValue: [number, number]) => void;
  handlePriceInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePriceBlur: () => void;
}

interface PriceInputProps {
  name: "minPrice" | "maxPrice";
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

const PriceInput = ({ name, label, value, min, max, onChange, onBlur }: PriceInputProps) => (
  <div className="flex-1">
    <label htmlFor={name} className="mb-1 block text-sm text-gray-600">
      {label}
    </label>

    <TextField
      fullWidth
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      size="small"
      type="number"
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
        htmlInput: { min, max },
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
);

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

  // A round step, so the handles land on prices like $500 rather than $489.
  // The far end still reaches the exact maximum, since the slider clamps to it.
  const step = maxPrice >= 2000 ? 50 : maxPrice >= 200 ? 10 : 1;

  const handleSliderChange = (event: Event, value: number | number[]) => {
    // Ensure to have an array of two numbers
    if (Array.isArray(value) && value.length === 2) {
      handlePriceChange(event, value as [number, number]);
    }
  };

  return (
    <div>
      <FilterHeading>Price Range</FilterHeading>

      <div className="px-6">
        <Slider
          getAriaLabel={() => "Price range"}
          value={priceRange}
          onChange={handleSliderChange}
          valueLabelDisplay="off"
          step={step}
          min={minPrice}
          max={maxPrice}
          getAriaValueText={(value) => `$${value}`}
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
            mb: { xs: 1, sm: 0 },
          }}
        />
      </div>

      <div className="flex gap-2">
        <PriceInput
          name="minPrice"
          label="Min"
          value={priceRange[0]}
          min={0}
          max={priceRange[1]} // Prevent min from exceeding current max
          onChange={handlePriceInputChange}
          onBlur={handlePriceBlur}
        />

        <PriceInput
          name="maxPrice"
          label="Max"
          value={priceRange[1]}
          min={priceRange[0]} // Prevent max from going below current min
          max={maxPrice}
          onChange={handlePriceInputChange}
          onBlur={handlePriceBlur}
        />
      </div>
    </div>
  );
};
