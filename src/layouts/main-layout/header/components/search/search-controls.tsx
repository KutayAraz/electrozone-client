import { useDispatch } from "react-redux";

interface SearchControlsProps {
  className?: string;
  style?: React.CSSProperties;
}

export const SearchControls = ({ className, style = {} }: SearchControlsProps) => {
  const dispatch = useDispatch<any>();
  const path = location.pathname;

  // Check if the path starts with '/category' and has more segments following it
  const pathSegments = location.pathname.split("/").filter(Boolean); // Split path and remove empty segments

  const showSearchControls =
    (pathSegments[0] === "category" && pathSegments.length >= 3) || path.startsWith("/search");

  // return (
  //   showSearchControls && (
  //     <div className={`flex bg-theme-blue sm:hidden ${className}`} style={style}>
  //       <Button
  //         className="flex-1"
  //         startIcon={<FilterAltIcon style={{ color: "white" }} />}
  //         onClick={() => dispatch(toggleFilterDrawer(true))}
  //         sx={{
  //           fontSize: "12px",
  //           justifyContent: "center",
  //           textTransform: "none",
  //           borderRadius: "0px",
  //           paddingTop: "0px",
  //           paddingBottom: "6px",
  //           "&:active": {
  //             backgroundColor: "#fffff", // Light gray on tap
  //           },
  //           borderRight: "1px solid white",
  //           borderBottom: "1px solid white",
  //           borderColor: "#ffffff",
  //           color: "white",
  //         }}
  //       >
  //         <Typography className="text-white">Filters</Typography>
  //       </Button>
  //       <Divider orientation="vertical" sx={{ color: "white" }} />
  //       <Button
  //         className="flex-1"
  //         startIcon={<SortIcon style={{ color: "white" }} />}
  //         onClick={() => dispatch(toggleSortingDrawer(true))}
  //         sx={{
  //           fontSize: "12px",
  //           textTransform: "none",
  //           borderRadius: "0px",
  //           paddingTop: "0px",
  //           paddingBottom: "6px",
  //           justifyContent: "center",
  //           borderLeft: "1px solid white",
  //           borderBottom: "1px solid white",

  //           "&:active": {
  //             backgroundColor: "#e0e0e0", // Light gray on tap
  //           },
  //         }}
  //       >
  //         <Typography className="text-white">Sort By</Typography>
  //       </Button>
  //     </div>
  //   )
  // );

  return null;
};
