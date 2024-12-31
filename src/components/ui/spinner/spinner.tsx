import { CircularProgress } from "@mui/material";

interface SpinnerProps {
  fullScreen?: boolean;
  size?: number;
  color?: "primary" | "secondary" | "inherit";
}

export const Spinner = ({ fullScreen = true, size = 40, color = "primary" }: SpinnerProps) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <CircularProgress size={size} color={color} />
      </div>
    );
  }

  return <CircularProgress size={size} color={color} />;
};
