import { useMediaQuery } from "@mui/material";

export const MOBILE_BREAKPOINT_QUERY = "(max-width: 768px)";

export const useIsMobile = () => useMediaQuery(MOBILE_BREAKPOINT_QUERY);
