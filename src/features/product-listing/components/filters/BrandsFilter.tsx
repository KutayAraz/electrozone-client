import SearchIcon from "@mui/icons-material/Search";
import { Box, Checkbox, Chip, FormControlLabel, InputAdornment, TextField } from "@mui/material";
import { useMemo, useState } from "react";

interface BrandsFilterProps {
  brandsData: string[];
  selectedBrands: string[];
  handleBrandChange: (brand: string) => void;
}

export const BrandsFilter = ({
  brandsData,
  selectedBrands,
  handleBrandChange,
}: BrandsFilterProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter brands based on search
  const filteredBrands = useMemo(() => {
    if (!searchTerm) return brandsData;
    return brandsData.filter((brand) => brand.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [brandsData, searchTerm]);

  return (
    <div>
      <h4 className="text-lg sm:text-[16px] font-semibold text-gray-900 mb-2 flex items-center gap-2">
        Brands
        {selectedBrands.length > 0 && (
          <Chip
            label={selectedBrands.length}
            size="small"
            sx={{
              height: { xs: "20px", sm: "18px" },
              backgroundColor: "#febd69",
              color: "#13193F",
              fontWeight: 600,
              fontSize: { xs: "0.8rem", sm: "0.75rem" },
            }}
          />
        )}
      </h4>

      {/* Search input for brands when there are many */}
      {brandsData.length > 6 && (
        <TextField
          fullWidth
          size="small"
          placeholder="Search brands..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            mb: 1,
            padding: 0,
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
              backgroundColor: "#f9fafb",
              "&:hover fieldset": {
                borderColor: "#13193F",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#13193F",
              },
              "& .MuiInputBase-input": {
                paddingY: { xs: "8px", md: "4px" },
                fontSize: { xs: "1rem", md: "0.875rem" },
              },
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon
                    fontSize="small"
                    className="text-gray-400"
                    sx={{ fontSize: { xs: "1.2rem", sm: "1rem" } }}
                  />
                </InputAdornment>
              ),
            },
          }}
        />
      )}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          maxHeight: "300px",
          overflowY: "auto",
          overflowX: "hidden",
          padding: "0",
          gap: { xs: "4px", sm: "0" },
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
        {filteredBrands.map((brand: string, index: number) => {
          const isSelected = selectedBrands.includes(brand);

          return (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  size="small"
                  checked={isSelected}
                  onChange={() => handleBrandChange(brand)}
                  name={brand}
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
                  slotProps={{
                    input: {
                      "aria-label": `Filter by ${brand} brand`,
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
                  {brand}
                </span>
              }
              sx={{
                margin: 0,
                paddingY: { xs: "6px", sm: "2px" },
                paddingX: { xs: "8px", sm: "0" },
                borderRadius: "6px",
                backgroundColor: isSelected ? "#f0f1f7" : "white",
                transition: "all 0.2s",
                width: "100%",
                minHeight: { xs: "44px", sm: "auto" }, // Touch-friendly height on mobile
                "&:hover": {
                  backgroundColor: isSelected ? "#f0f1f7" : "#f9fafb",
                },
              }}
            />
          );
        })}
      </Box>

      {/* No results message */}
      {searchTerm && filteredBrands.length === 0 && (
        <p className="text-base sm:text-sm text-gray-500 mt-4 text-center">
          No brands found matching &quot;{searchTerm}&quot;
        </p>
      )}
    </div>
  );
};
