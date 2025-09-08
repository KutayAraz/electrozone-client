import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CloseIcon from "@mui/icons-material/Close";
import SortIcon from "@mui/icons-material/Sort";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Divider,
  Drawer,
  IconButton,
  ListItemIcon,
  MenuItem,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

import { SortMethod, useSorting } from "../../hooks/use-sorting";

interface SortingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SortingDrawer = ({ isOpen, onClose }: SortingDrawerProps) => {
  const { handleSortChange } = useSorting();

  const handleSortSelection = (sortValue: SortMethod | SelectChangeEvent<SortMethod>) => {
    handleSortChange(sortValue);
    onClose(); // Close the drawer after selection
  };

  return (
    <Drawer open={isOpen} onClose={onClose} anchor="bottom">
      <div className="pb-2 [&_.MuiMenuItem-root]:px-6 [&_.MuiMenuItem-root]:py-4">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex space-x-3">
            <SortIcon style={{ color: "#757575" }} />
            <Typography
              variant="body1"
              sx={{ color: "#373D51", fontSize: { xs: "1rem", sm: "0.875rem" } }}
            >
              Sort By
            </Typography>
          </div>
          <div>
            <IconButton
              onClick={onClose}
              sx={{
                color: (theme) => theme.palette.grey[500],
                padding: { xs: "12px", sm: "8px" },
              }}
            >
              <CloseIcon sx={{ fontSize: { xs: "1.5rem", sm: "1.25rem" } }} />
            </IconButton>
          </div>
        </div>
        <Divider />
        <MenuItem
          value={"featured"}
          onClick={() => handleSortSelection("featured")}
          sx={{ minHeight: { xs: "52px", sm: "auto" } }}
        >
          <ListItemIcon>
            <StarBorderIcon sx={{ fontSize: { xs: "1.5rem", sm: "1.25rem" } }} />
          </ListItemIcon>
          <Typography
            variant="body1"
            sx={{ color: "#373D51", fontSize: { xs: "1.125rem", sm: "1rem" } }}
          >
            Featured
          </Typography>
        </MenuItem>
        <MenuItem
          value={"rating"}
          onClick={() => handleSortSelection("rating")}
          sx={{ minHeight: { xs: "52px", sm: "auto" } }}
        >
          <ListItemIcon>
            <TrendingUpIcon sx={{ fontSize: { xs: "1.5rem", sm: "1.25rem" } }} />
          </ListItemIcon>
          <Typography
            variant="body1"
            sx={{ color: "#373D51", fontSize: { xs: "1.125rem", sm: "1rem" } }}
          >
            Ratings
          </Typography>
        </MenuItem>
        <MenuItem
          value={"price_ascending"}
          onClick={() => handleSortSelection("price_ascending")}
          sx={{ minHeight: { xs: "52px", sm: "auto" } }}
        >
          <ListItemIcon>
            <ArrowUpwardIcon sx={{ fontSize: { xs: "1.5rem", sm: "1.25rem" } }} />
          </ListItemIcon>
          <Typography
            variant="body1"
            sx={{ color: "#373D51", fontSize: { xs: "1.125rem", sm: "1rem" } }}
          >
            Price Ascending
          </Typography>
        </MenuItem>
        <MenuItem
          value={"price_descending"}
          onClick={() => handleSortSelection("price_descending")}
          sx={{ minHeight: { xs: "52px", sm: "auto" } }}
        >
          <ListItemIcon>
            <ArrowDownwardIcon sx={{ fontSize: { xs: "1.5rem", sm: "1.25rem" } }} />
          </ListItemIcon>
          <Typography
            variant="body1"
            sx={{ color: "#373D51", fontSize: { xs: "1.125rem", sm: "1rem" } }}
          >
            Price Descending
          </Typography>
        </MenuItem>
      </div>
    </Drawer>
  );
};
