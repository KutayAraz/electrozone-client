import { Box, Checkbox, FormControlLabel } from "@mui/material";

import { formatString } from "@/utils/format-casing";

interface SubcategoriesFilterProps {
  subcategoriesData: string[];
  selectedSubcategories: string[];
  handleSubcategoryChange: (subcategory: string) => void;
}

export const SubcategoriesFilter = ({
  subcategoriesData,
  selectedSubcategories,
  handleSubcategoryChange,
}: SubcategoriesFilterProps) => {
  return (
    <div>
      <h4 className="text-lg sm:text-[16px] font-semibold text-gray-900 mb-3 sm:mb-1">
        Subcategories
      </h4>

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
        {subcategoriesData.map((subcategory: string, index: number) => {
          const isSelected = selectedSubcategories.includes(subcategory);

          return (
            <FormControlLabel
              key={index}
              control={
                <Checkbox
                  size="small"
                  checked={isSelected}
                  onChange={() => handleSubcategoryChange(subcategory)}
                  name={subcategory}
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
                      "aria-label": `Filter by ${subcategory} subcategory`,
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
                  {formatString(subcategory, "_")}
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
    </div>
  );
};
