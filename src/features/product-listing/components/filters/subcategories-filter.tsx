import { Box, Checkbox, FormControlLabel } from "@mui/material";

interface SubcategoriesFilterProps {
  subcategoriesData: string[];
  selectedSubcategories: string[];
  handleSubcategoryChange: (subcategory: string) => void;
  compact?: boolean;
}

export const SubcategoriesFilter = ({
  subcategoriesData,
  selectedSubcategories,
  handleSubcategoryChange,
  compact = false,
}: SubcategoriesFilterProps) => {
  return (
    <div>
      <h4 className={`${compact ? "text-base" : "text-lg"} font-semibold mb-1`}>Categories</h4>
      <Box
        sx={
          compact
            ? {
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                gap: 0,
              }
            : {}
        }
      >
        {subcategoriesData.map((subcategory: string, index: number) => (
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
                checked={selectedSubcategories.includes(subcategory)}
                onChange={() => handleSubcategoryChange(subcategory)}
                name={subcategory}
              />
            }
            label={subcategory.replace(/-/g, " ")}
            sx={{
              "& .MuiFormControlLabel-label": {
                fontSize: compact ? "0.9rem" : "1rem",
                textTransform: "capitalize",
              },
              justifyContent: "start",
            }}
          />
        ))}
      </Box>
    </div>
  );
};
