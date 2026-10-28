import SearchIcon from "@mui/icons-material/Search";
import { Chip, InputAdornment, TextField } from "@mui/material";
import { useMemo, useState } from "react";

import { FilterCheckboxList, FilterHeading } from "./FilterOption";

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
      <FilterHeading>
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
      </FilterHeading>

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

      <FilterCheckboxList
        options={filteredBrands.map((brand) => ({ value: brand, label: brand }))}
        selected={selectedBrands}
        onToggle={handleBrandChange}
        getAriaLabel={(label) => `Filter by ${label} brand`}
      />

      {/* No results message */}
      {searchTerm && filteredBrands.length === 0 && (
        <p className="text-base sm:text-sm text-gray-500 mt-4 text-center">
          No brands found matching &quot;{searchTerm}&quot;
        </p>
      )}
    </div>
  );
};
