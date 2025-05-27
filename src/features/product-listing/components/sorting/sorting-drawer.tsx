import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CloseIcon from "@mui/icons-material/Close";
import SortIcon from "@mui/icons-material/Sort";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Divider, Drawer, IconButton, ListItemIcon, MenuItem, Typography } from "@mui/material";
import { useState } from "react";

import { useSorting } from "../../hooks/use-sorting";

export const SortingDrawer = () => {
  const { handleSortChange } = useSorting();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)} anchor="bottom">
      <div className="pb-2 [&_li]:px-6 [&_li]:py-3">
        <div className="flex items-center justify-between px-6 py-[8px]">
          <div className="flex space-x-3">
            <SortIcon style={{ color: "#757575" }} />
            <Typography variant="body1" sx={{ color: "#373D51" }}>
              Sort By
            </Typography>
          </div>
          <div>
            <IconButton
              onClick={() => setIsOpen(false)}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </div>
        </div>
        <Divider />
        <MenuItem value={"featured"} onClick={() => handleSortChange("featured")}>
          <ListItemIcon>
            <StarBorderIcon />
          </ListItemIcon>
          <Typography variant="body1" sx={{ color: "#373D51" }}>
            Featured
          </Typography>
        </MenuItem>
        <MenuItem value={"rating"} onClick={() => handleSortChange("rating")}>
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <Typography variant="body1" sx={{ color: "#373D51" }}>
            Ratings
          </Typography>
        </MenuItem>
        <MenuItem value={"price_ascending"} onClick={() => handleSortChange("price_ascending")}>
          <ListItemIcon>
            <ArrowUpwardIcon />
          </ListItemIcon>
          <Typography variant="body1" sx={{ color: "#373D51" }}>
            Price Ascending
          </Typography>
        </MenuItem>
        <MenuItem value={"price_descending"} onClick={() => handleSortChange("price_descending")}>
          <ListItemIcon>
            <ArrowDownwardIcon />
          </ListItemIcon>
          <Typography variant="body1" sx={{ color: "#373D51" }}>
            Price Descending
          </Typography>
        </MenuItem>
      </div>
    </Drawer>
  );
};
