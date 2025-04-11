import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";

type FilterMenuProps = {
  brands: string[];
  searchParams: any;
  handleFiltering: any;
};

export const FilterMenu = ({ searchParams, handleFiltering }: FilterMenuProps) => {
  return (
    <div className="static h-full">
      <Box sx={{ minWidth: 120, maxHeight: "80px" }}>
        <FormControl className="rounded-lg shadow-md ">
          <InputLabel id="filter-by" sx={{ fontSize: "1rem" }}>
            Filter By
          </InputLabel>
          <Select
            id="filter-by"
            label="Filter By"
            value={searchParams.get("filter") || ""}
            onChange={handleFiltering}
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
      </Box>
    </div>
  );
};
