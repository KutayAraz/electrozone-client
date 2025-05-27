import { FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

import { useSorting } from "../../hooks/use-sorting";

interface SortingPanelProps {
  className?: string;
}

export const SortingPanel = ({ className = "" }: SortingPanelProps) => {
  const { currentSortMethod, handleSortChange } = useSorting();

  return (
    <FormControl className={`rounded-lg shadow-md ${className}`}>
      <InputLabel id="sort-by" sx={{ fontSize: "1rem" }}>
        Sort By
      </InputLabel>
      <Select
        id="sort-by"
        labelId="sort-by"
        label="Sort By"
        value={currentSortMethod}
        onChange={handleSortChange}
        sx={{ padding: "2px", "& .MuiSelect-select": { padding: "4px" } }}
      >
        <MenuItem value={"featured"}>
          <Typography variant="body2">Featured</Typography>
        </MenuItem>
        <MenuItem value={"rating"}>
          <Typography variant="body2">Rating</Typography>
        </MenuItem>
        <MenuItem value={"price_ascending"}>
          <Typography variant="body2">Price Ascending</Typography>
        </MenuItem>
        <MenuItem value={"price_descending"}>
          <Typography variant="body2">Price Descending</Typography>
        </MenuItem>
      </Select>
    </FormControl>
  );
};
