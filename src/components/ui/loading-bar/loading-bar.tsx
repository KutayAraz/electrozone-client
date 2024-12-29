import { LinearProgress } from "@mui/material";
import { memo } from "react";
import { useNavigation } from "react-router-dom";

export const LoadingIndicator = memo(() => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  if (!isLoading) return null;
  return (
    <div
      className={`fixed left-0 top-0 h-1 w-full`}
      style={{ zIndex: 100 }}
      role="progressbar"
      aria-label="Page loading indicator"
    >
      <LinearProgress
        sx={{
          "& .MuiLinearProgress-bar": {
            transition: "transform 0.2s linear",
          },
        }}
      />
    </div>
  );
});

LoadingIndicator.displayName = "LoadingIndicator";
