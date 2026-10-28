import { Box, Checkbox, FormControlLabel, SxProps, Theme } from "@mui/material";

// Shared building blocks so every filter section looks the same

export const FilterHeading = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <h4
    id={id}
    className="mb-2 flex items-center gap-2 text-lg font-semibold text-gray-900 sm:text-[16px]"
  >
    {children}
  </h4>
);

/** Styles for the checkbox or radio inside a filter row. */
export const filterControlSx = (iconRadius: string): SxProps<Theme> => ({
  padding: { xs: "8px", sm: "4px" },
  color: "#9ca3af",
  "&.Mui-checked": {
    color: "#13193F",
  },
  "&:hover .MuiSvgIcon-root": {
    backgroundColor: "rgba(19, 25, 63, 0.04)",
    borderRadius: iconRadius,
  },
  "& .MuiSvgIcon-root": {
    fontSize: { xs: "1.3rem", sm: "1.1rem" },
    transition: "background-color 0.2s ease",
  },
});

/** Styles for the clickable row around a filter option. */
export const filterRowSx = (isSelected: boolean): SxProps<Theme> => ({
  margin: 0,
  paddingY: { xs: "4px", sm: "2px" },
  borderRadius: "6px",
  backgroundColor: isSelected ? "#f0f1f7" : "white",
  transition: "background-color 0.2s",
  width: "100%",
  minHeight: { xs: "44px", sm: "auto" }, // Touch-friendly height on mobile
  "&:hover": {
    backgroundColor: isSelected ? "#f0f1f7" : "#f9fafb",
  },
});

export const FilterOptionLabel = ({
  isSelected,
  children,
}: {
  isSelected: boolean;
  children: React.ReactNode;
}) => (
  <span
    className={`select-none text-base transition-all duration-200 sm:text-sm ${
      isSelected ? "font-semibold text-gray-900" : "font-medium text-gray-700"
    }`}
  >
    {children}
  </span>
);

interface FilterCheckboxListProps {
  options: { value: string; label: string }[];
  selected: string[];
  onToggle: (value: string) => void;
  getAriaLabel: (label: string) => string;
}

/** A scrollable grid of checkboxes: one column in the sidebar, two in the mobile drawer. */
export const FilterCheckboxList = ({
  options,
  selected,
  onToggle,
  getAriaLabel,
}: FilterCheckboxListProps) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
      maxHeight: "300px",
      overflowY: "auto",
      overflowX: "hidden",
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
    {options.map(({ value, label }) => {
      const isSelected = selected.includes(value);

      return (
        <FormControlLabel
          key={value}
          control={
            <Checkbox
              size="small"
              checked={isSelected}
              onChange={() => onToggle(value)}
              name={value}
              sx={filterControlSx("4px")}
              slotProps={{
                input: {
                  "aria-label": getAriaLabel(label),
                },
              }}
            />
          }
          label={<FilterOptionLabel isSelected={isSelected}>{label}</FilterOptionLabel>}
          sx={filterRowSx(isSelected)}
        />
      );
    })}
  </Box>
);
