import { Box, Checkbox, FormControlLabel } from "@mui/material";

interface BrandsFilterProps {
  brandsData: string[];
  selectedBrands: string[];
  handleBrandChange: (brand: string) => void;
  compact?: boolean;
}

export const BrandsFilter = ({
  brandsData,
  selectedBrands,
  handleBrandChange,
  compact = false,
}: BrandsFilterProps) => {
  return (
    <div>
      <h4 className={`${compact ? "text-base" : "text-lg"} font-semibold mb-1`}>Brands</h4>
      <Box
        sx={
          compact
            ? {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
                gap: 0,
              }
            : {}
        }
      >
        {brandsData.map((brand: string, index: number) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: compact ? "1rem" : "1.1rem",
                  },
                  "&.MuiButtonBase-root": {
                    paddingLeft: "10px",
                    paddingRight: "6px",
                    paddingY: "5px",
                  },
                }}
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                name={brand}
              />
            }
            label={brand}
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: compact ? "0.9rem" : "1rem",
              },
              justifyContent: "start",
            }}
          />
        ))}
      </Box>
    </div>
  );
};
